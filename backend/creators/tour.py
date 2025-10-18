from django.db import models
from .models import TourCreator

class AttractionSite(models.Model):
    "model to allow creator create tourism site"
    name = models.CharField(max_length=250)
    description = models.TextField()
    longitude = models.DecimalField(max_digits=9,decimal_places=6,null=True,blank=True)
    latitude = models.DecimalField(max_digits=9,decimal_places=6,null=True,blank=True)