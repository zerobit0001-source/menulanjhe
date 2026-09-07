from django.urls import path
from .views import SelectTenantView

urlpatterns = [
    path("select_tenant/", SelectTenantView.as_view(), name="select-tenant"),
]