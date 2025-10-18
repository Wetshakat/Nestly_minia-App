from rest_framework import viewsets
from .serializers  import TourCreatorSerializer,UserSerializer,AttractionSerializer
from creators.models  import TourCreator
from creators.tour import AttractionSite
from rest_framework.permissions import IsAuthenticated,AllowAny

class CreatorViewset(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = TourCreatorSerializer
    queryset = TourCreator.objects.all()
    permission_classes = [AllowAny]

class UserViewset(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    queryset = TourCreator.objects.all()
    permission_classes = [AllowAny]

    def get_queryset(self):
        return TourCreator.objects.filter(id=self.request.user.id)


class AttractionViewset(viewsets.ModelViewSet):
    http_method_names = ['post','get']
    serializer_class = AttractionSerializer
    queryset = AttractionSite.objects.all()
    permission_classes = [AllowAny]



