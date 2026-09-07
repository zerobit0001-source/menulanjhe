from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ChangePasswordView, MeView, SelectTenantView

app_name = "accounts"

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("me/", MeView.as_view(), name="me"),
    path("select_tenant/", SelectTenantView.as_view(), name="select-tenant"),
    path("change_password/", ChangePasswordView.as_view(), name="change-password"),
]