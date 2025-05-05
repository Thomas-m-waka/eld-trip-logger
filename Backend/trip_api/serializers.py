from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def validate(self, attrs):
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Username already taken."})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email already registered."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data['username']
        password = data['password']

        user = User.objects.filter(username=username).first()
        if not user:
            raise serializers.ValidationError("Username does not exist")  

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Incorrect password")  

        
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class TripSerializer(serializers.ModelSerializer):
    driver = serializers.StringRelatedField()
    created_at = serializers.DateTimeField(read_only=True)


    class Meta:
        model = Trip
        fields = ['id', 'driver', 'current_location', 'pickup_location', 'cycle_hours_used', 'created_at']


class DailyLogSheetSerializer(serializers.ModelSerializer):
    trip = TripSerializer()
    date = serializers.TimeField(read_only=True)

    class Meta:
        model = DailyLogSheet
        fields = ['id', 'trip', 'date', 'driver_number', 'driver_initials', 'co_driver_name', 'total_miles', 'vehicle_number', 'shipper_name', 'commodity', 'load_number', 'home_address']


class ELDLogEntrySerializer(serializers.ModelSerializer):
    daily_log = DailyLogSheetSerializer()
    time = serializers.TimeField(read_only=True)

    class Meta:
        model = ELDLogEntry
        fields = ['id', 'daily_log', 'time', 'status', 'location', 'remarks']
