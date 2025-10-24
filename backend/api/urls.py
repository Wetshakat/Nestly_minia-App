from django.urls import path
from rest_framework.routers  import SimpleRouter
from .views  import CreatorViewset,UserViewset,AttractionViewset
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = SimpleRouter()
router.register("creators",CreatorViewset,basename='tour-creators')
router.register("users",UserViewset,basename='users')
router.register("attractions",AttractionViewset,basename='attractions')

urlpatterns = router.urls

urlpatterns += [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]