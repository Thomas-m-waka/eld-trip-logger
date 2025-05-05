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
            'message': "Login successful",
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

