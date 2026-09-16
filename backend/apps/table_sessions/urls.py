from rest_framework.routers import DefaultRouter
from .views import TableSessionViewSet

app_name = "table_sessions"

router = DefaultRouter()
router.register("table_sessions", TableSessionViewSet, basename="table-session")

urlpatterns = router.urls