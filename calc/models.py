from django.db import models

class AgriculturalTourBooking(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    preferred_date = models.DateField()
    group_size = models.PositiveIntegerField()
    tour_type = models.CharField(max_length=50, choices=[
        ('farm-tour', 'Farm Tour'),
        ('harvest-experience', 'Harvest Experience'),
        ('workshop', 'Agricultural Workshop'),
        ('food-tasting', 'Food Tasting')
    ])
    special_requirements = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} - {self.tour_type} on {self.preferred_date}"
    
from django.db import models

class CropSale(models.Model):
    crop_name = models.CharField(max_length=100)
    crop_image = models.ImageField(upload_to='crop_images/')
    quantity = models.PositiveIntegerField()
    additional_details = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.crop_name

