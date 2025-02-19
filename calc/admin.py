from django.contrib import admin

from .models import AgriculturalTourBooking


@admin.register(AgriculturalTourBooking)
class AgriculturalTourBookingAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'tour_type', 'preferred_date', 'group_size')
