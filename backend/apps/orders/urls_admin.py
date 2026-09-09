from rest_framework.routers import DefaultRouter
from .views_admin import OrderViewSet

app_name = "orders"

router = DefaultRouter()
router.register("orders", OrderViewSet, basename="order")

urlpatterns = router.urls