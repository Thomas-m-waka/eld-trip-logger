from django.contrib.auth.models import User
from django.db import models

class Trip(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trips")
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    cycle_hours_used = models.PositiveIntegerField(help_text="Hours used in the 70-hour cycle")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.driver.username} | {self.pickup_location} → {self.dropoff_location}"



class DailyLogSheet(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="daily_logs")
    date = models.DateField()
    driver_number = models.CharField(max_length=20)
    driver_initials = models.CharField(max_length=10)
    co_driver_name = models.CharField(max_length=255, blank=True, null=True)
    total_miles = models.PositiveIntegerField()
    vehicle_number = models.CharField(max_length=50)
    shipper_name = models.CharField(max_length=255)
    commodity = models.CharField(max_length=255)
    load_number = models.CharField(max_length=100)
    home_address = models.CharField(max_length=255)

    def __str__(self):
        return f"LogSheet | {self.trip.driver.username} | {self.date}"



class ELDLogEntry(models.Model):
    daily_log = models.ForeignKey(DailyLogSheet, on_delete=models.CASCADE, related_name="eld_entries")
    time = models.TimeField()
    status = models.CharField(max_length=50, choices=[
        ("Off Duty", "Off Duty"),
        ("Sleeper Berth", "Sleeper Berth"),
        ("Driving", "Driving"),
        ("On Duty (Not Driving)", "On Duty (Not Driving)"),
    ])
    location = models.CharField(max_length=255, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.daily_log.trip.driver.username} | {self.time} - {self.status}"
