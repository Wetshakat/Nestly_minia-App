from django.contrib import admin
from .models  import TourCreator
from .tour  import AttractionSite

admin.site.register(AttractionSite)

@admin.register(TourCreator)
class CreatorUserAdmin(admin.ModelAdmin):
    list_display = ['username','email','type','phone','created_at']


