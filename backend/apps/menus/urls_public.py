from django.urls import path
from .views_public import PublicMenuDetailView

app_name = "menus_public"

urlpatterns = [
    path("menus/<slug:slug>/", PublicMenuDetailView.as_view(), name="public-menu-detail"),
]