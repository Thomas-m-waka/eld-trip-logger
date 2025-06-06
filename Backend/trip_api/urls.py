from django.urls import path
from . views import *
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns=[
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-profile/', ProfileAPIView.as_view(), name='user-profile'),
    path('trips/', TripListView.as_view(), name='trip-list'),
    path('trips/create/', TripCreateView.as_view(), name='trip-create'),
    path('trips/<int:id>/', TripDetailView.as_view(), name='trip-detail'),
    path('trips/<int:id>/logs/', TripELDLogsView.as_view(), name='trip-eld-logs'),
    path('daily-logs/', DailyLogListView.as_view(), name='daily-log-list'),
    path('daily-logs/create/', DailyLogCreateView.as_view(), name='daily-log-create'),
    path('daily-logs/<int:id>/', DailyLogDetailView.as_view(), name='daily-log-detail'),
    path('eld-entries/', ELDLogEntryListView.as_view(), name='eld-log-list'),
    path('eld-logs/create/', ELDLogEntryCreateView.as_view(), name='eld-log-create'),
    path('eld-logs/<int:id>/', ELDLogEntryDetailView.as_view(), name='eld-log-detail'),
    path("logs/<int:logsheet_id>/pdf/",  GenerateLogsheetPdf.as_view(), name="generate_logsheet_pdf"),
]