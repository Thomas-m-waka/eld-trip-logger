from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, permissions
from django.contrib.auth.decorators import login_required
from io import BytesIO
from .utils import generate_status_graph
from django.http import Http404
from reportlab.lib.pagesizes import letter
from reportlab.lib.pagesizes import inch
from django.http import FileResponse
import os
from io import BytesIO
from reportlab.pdfgen import canvas
from rest_framework.generics import ListAPIView



class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = []  
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)



class TripCreateView(generics.CreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(driver=self.request.user)


class TripListView(generics.ListAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Trip.objects.filter(driver=self.request.user)


class TripDetailView(generics.RetrieveAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return Trip.objects.filter(driver=self.request.user)
    


class DailyLogCreateView(generics.CreateAPIView):
    queryset = DailyLogSheet.objects.all()
    serializer_class = DailyLogSheetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class DailyLogListView(generics.ListAPIView):
    serializer_class = DailyLogSheetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DailyLogSheet.objects.filter(trip__driver=self.request.user)

class DailyLogDetailView(generics.RetrieveAPIView):
    serializer_class = DailyLogSheetSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return DailyLogSheet.objects.filter(trip__driver=self.request.user)



class TripELDLogsView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ELDLogEntrySerializer

    def get_queryset(self):
        trip_id = self.kwargs['id']
        user = self.request.user

        try:
            trip = Trip.objects.get(id=trip_id)
        except Trip.DoesNotExist:
            return ELDLogEntry.objects.none()

        if trip.driver != user:
            raise PermissionDenied(detail="You do not have permission to access this trip's logs.")

        return ELDLogEntry.objects.filter(daily_log__trip_id=trip_id).order_by('time')


class ELDLogEntryCreateView(generics.CreateAPIView):
    serializer_class = ELDLogEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        eld_log = serializer.save()
        ELDLogEntry.calculate_daily_miles(eld_log.daily_log)

class ELDLogEntryListView(generics.ListAPIView):
    serializer_class = ELDLogEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ELDLogEntry.objects.filter(daily_log__trip__driver=self.request.user)
    
class ELDLogEntryDetailView(generics.RetrieveAPIView):
    serializer_class = ELDLogEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return ELDLogEntry.objects.filter(daily_log__trip__driver=self.request.user)
    



class GenerateLogsheetPdf(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, logsheet_id):
        try:
            log = DailyLogSheet.objects.select_related("trip", "trip__driver") \
                .prefetch_related("eld_entries").get(id=logsheet_id)
        except DailyLogSheet.DoesNotExist:
            raise Http404("Log not found")

        if request.user != log.trip.driver and not request.user.is_staff:
            raise Http404("Not authorized")

        buffer = BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        # === Header (Top Section) ===
        y = height - inch
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(inch, y, f"Date: {log.date}")
        pdf.drawRightString(width - inch, y, f"Total Miles Today: {log.total_miles}")
        y -= 20

        pdf.setFont("Helvetica", 10)
        pdf.drawString(inch, y, f"Driver Name: {log.trip.driver.username}")
        y -= 15
        pdf.drawString(inch, y, f"Driver Initials: {log.driver_initials}")
        y -= 15
        pdf.drawString(inch, y, f"Driver Number: {log.driver_number}")
        y -= 15
        pdf.drawString(inch, y, f"Vehicle Number: {log.vehicle_number}")
        y -= 15

        if log.co_driver_name:
            pdf.drawString(inch, y, f"Co-driver: {log.co_driver_name}")
            y -= 15

        pdf.drawString(inch, y, f"Home Address: {log.home_address}")
        y -= 25

        # === ELD Chart ===
        img_path = generate_status_graph(log.eld_entries.all())
        pdf.drawInlineImage(img_path, inch, y - 130, width=6 * inch, height=1.5 * inch)
        y -= 160

        # === Load Info (Bottom Section) ===
        pdf.setFont("Helvetica", 10)
        pdf.drawString(inch, y, f"Load Number: {log.load_number}")
        y -= 15
        pdf.drawString(inch, y, f"Commodity: {log.commodity}")
        y -= 15
        pdf.drawString(inch, y, f"Shipper: {log.shipper_name}")

        # === Finalize PDF ===
        pdf.showPage()
        pdf.save()
        buffer.seek(0)
        os.remove(img_path)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=f"DailyLog_{log.id}.pdf",
            content_type='application/pdf'
        )
