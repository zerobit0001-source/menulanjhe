from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("apps.accounts.urls")),
    path("api/v1/platform/", include("apps.tenants.urls_platform")),
    path("api/v1/admin/", include("apps.tenants.urls_admin")),
]