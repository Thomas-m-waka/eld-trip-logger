from django.contrib import admin
from .models import *

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('driver', 'pickup_location_name', 'current_location_name', 'cycle_hours_used', 'created_at')
    search_fields = ('driver__username', 'pickup_location_name', 'current_location_name')
    list_filter = ('created_at',)


@admin.register(DailyLogSheet)
class DailyLogSheetAdmin(admin.ModelAdmin):
    list_display = ('trip', 'date', 'driver_number', 'total_miles', 'vehicle_number', 'shipper_name')
    search_fields = ('trip__driver__username', 'driver_number', 'vehicle_number', 'shipper_name')
    list_filter = ('date',)


@admin.register(ELDLogEntry)
class ELDLogEntryAdmin(admin.ModelAdmin):
    list_display = ('daily_log', 'time', 'status', 'location')
    search_fields = ('daily_log__trip__driver__username', 'status', 'location')
    list_filter = ('status',)
