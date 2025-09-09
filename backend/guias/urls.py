from rest_framework.routers import DefaultRouter
from .views import GuiaViewSet

router = DefaultRouter()
router.register(r'guias', GuiaViewSet)

urlpatterns = router.urls