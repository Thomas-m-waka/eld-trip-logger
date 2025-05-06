from django.contrib.auth.models import User
from django.db import models
from math import radians, cos, sin, asin, sqrt


class Trip(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trips")
    current_location_name = models.CharField(max_length=255, blank=True, null=True)
    current_latitude = models.FloatField()
    current_longitude = models.FloatField()
    pickup_location_name = models.CharField(max_length=255, blank=True, null=True)
    pickup_latitude = models.FloatField()
    pickup_longitude = models.FloatField()
    cycle_hours_used = models.PositiveIntegerField(help_text="Hours used in the 70-hour cycle")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.driver.username} | {self.pickup_location_name} → {self.current_location_name}"


class DailyLogSheet(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="daily_logs")
    date = models.DateField(auto_now_add=True)
    driver_number = models.CharField(max_length=20)
    driver_initials = models.CharField(max_length=10)
    co_driver_name = models.CharField(max_length=255, blank=True, null=True)
    total_miles = models.PositiveIntegerField(default=0)
    vehicle_number = models.CharField(max_length=50)
    shipper_name = models.CharField(max_length=255)
    commodity = models.CharField(max_length=255)
    load_number = models.CharField(max_length=100)
    home_address = models.CharField(max_length=255)

    def __str__(self):
        return f"LogSheet | {self.trip.driver.username} | {self.date}"

    def calculate_total_miles(self):
        entries = self.eld_entries.order_by('time')

        total_miles = 0.0
        for i in range(1, len(entries)):
            prev = entries[i - 1]
            curr = entries[i]

            # Calculate distance only when the status is 'Driving'
            if prev.status == "Driving" or curr.status == "Driving":
                total_miles += ELDLogEntry.haversine(prev.latitude, prev.longitude, curr.latitude, curr.longitude)

        self.total_miles = round(total_miles)  # Update the total miles in the DailyLogSheet
        self.save()  # Save the daily log sheet with updated total miles
        return self.total_miles


class ELDLogEntry(models.Model):
    daily_log = models.ForeignKey(DailyLogSheet, on_delete=models.CASCADE, related_name="eld_entries")
    time = models.TimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[
        ("Off Duty", "Off Duty"),
        ("Sleeper Berth", "Sleeper Berth"),
        ("Driving", "Driving"),
        ("On Duty (Not Driving)", "On Duty (Not Driving)"),
    ])
    location = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.daily_log.trip.driver.username} | {self.time} - {self.status}"

    @staticmethod
    def haversine(lat1, lon1, lat2, lon2):
        R = 3956.0  # Radius of Earth in miles
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * asin(sqrt(a))
        return R * c

    @classmethod
    def calculate_daily_miles(cls, daily_log):
        entries = daily_log.eld_entries.order_by('time')
        total_miles = 0.0

        for i in range(1, len(entries)):
            prev = entries[i - 1]
            curr = entries[i]
            # Check if either entry has 'Driving' status, and calculate the distance
            if prev.status == "Driving" or curr.status == "Driving":
                total_miles += cls.haversine(prev.latitude, prev.longitude, curr.latitude, curr.longitude)

        # Update and save the daily log's total miles
        daily_log.total_miles = round(total_miles)
        daily_log.save()

        return round(total_miles)
