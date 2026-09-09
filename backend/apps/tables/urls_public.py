from django.urls import path
from .views_public import ResolveTableView

app_name = "tables_public"

urlpatterns = [
    path("tables/resolve/<str:qr_token>/", ResolveTableView.as_view(), name="resolve-table"),
]