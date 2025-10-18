from rest_framework import serializers
from creators.models  import TourCreator

class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCreator
        fields = []
    
