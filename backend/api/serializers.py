from rest_framework import serializers
from creators.models  import TourCreator
from creators.tour   import AttractionSite

class TourCreatorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = TourCreator
        fields = ["username","first_name","last_name","email","type",
                  "address","phone","company_name","reg_no","password"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCreator
        fields = ["username","first_name","last_name","email","type",
                  "address","phone","company_name","reg_no"]


class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttractionSite
        fields = ["name","image","description","longitude","latitude"]
        
    
