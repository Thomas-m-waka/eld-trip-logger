from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics, permissions


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(TokenObtainPairView):
    permission_classes = []  
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({
                "message": "Login successful",
                "data": serializer.validated_data
            }, status=status.HTTP_200_OK)
        
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