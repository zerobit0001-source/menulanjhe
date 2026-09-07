from django.urls import path
from .views_platform import OnboardTenantView

app_name = "tenants_platform"

urlpatterns = [
    path("onboard_tenant/", OnboardTenantView.as_view(), name="onboard-tenant"),
]