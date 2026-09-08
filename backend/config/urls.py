from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("apps.accounts.urls")),
    path("api/v1/platform/", include("apps.tenants.urls_platform")),
    path("api/v1/admin/", include("apps.tenants.urls_admin")),
    path("api/v1/admin/", include("apps.restaurants.urls")),
    path("api/v1/admin/", include("apps.branches.urls")),
    path("api/v1/admin/", include("apps.menus.urls")),
    path("api/v1/admin/", include("apps.products.urls")),
    path("api/v1/public/", include("apps.menus.urls_public")),
]