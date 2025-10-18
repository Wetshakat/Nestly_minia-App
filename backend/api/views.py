from rest_framework import viewsets
from .serializers  import CreatorSerializer
from creators.models  import TourCreator

class CreatorViewset(viewsets.ModelViewSet):
    http_method_names = ['post','get']
    serializer_class = CreatorSerializer
    queryset = TourCreator.objects.all()
