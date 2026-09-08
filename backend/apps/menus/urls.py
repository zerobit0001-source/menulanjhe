from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, MenuViewSet

app_name = "menus"

router = DefaultRouter()
router.register("menus", MenuViewSet, basename="menu")
router.register("categories", CategoryViewSet, basename="category")

urlpatterns = router.urls