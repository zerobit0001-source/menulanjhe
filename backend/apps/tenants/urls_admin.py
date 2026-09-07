from rest_framework.routers import DefaultRouter

from .views_admin import RoleViewSet, StaffViewSet

app_name = "tenants"

router = DefaultRouter()
router.register("staff", StaffViewSet, basename="staff")
router.register("roles", RoleViewSet, basename="role")

urlpatterns = router.urls