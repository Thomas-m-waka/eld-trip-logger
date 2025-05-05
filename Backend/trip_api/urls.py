from django.urls import path
from . views import *



urlpatterns=[
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('user-profile/', ProfileAPIView.as_view(), name='user-profile'),
    path('trips/', TripListView.as_view(), name='trip-list'),
    path('trips/create/', TripCreateView.as_view(), name='trip-create'),
    path('trips/<int:id>/', TripDetailView.as_view(), name='trip-detail'),
]