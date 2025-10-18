from rest_framework.routers  import SimpleRouter
from .views  import CreatorViewset

router = SimpleRouter()
router.register("creators",CreatorViewset,basename='tour-creators')

urlpatterns = router.urls