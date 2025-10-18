from django.db import models
from .models import TourCreator
from django.contrib.auth  import get_user_model

class AttractionSite(models.Model):
    "model to allow creator create tourism site"
    creator = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    description = models.TextField()
    longitude = models.DecimalField(max_digits=9,decimal_places=6,null=True,blank=True)
    latitude = models.DecimalField(max_digits=9,decimal_places=6,null=True,blank=True)