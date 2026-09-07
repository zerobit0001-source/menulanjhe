from rest_framework.routers import DefaultRouter
from .views import BranchViewSet

app_name = "branches"

router = DefaultRouter()
router.register("branches", BranchViewSet, basename="branch")

urlpatterns = router.urls