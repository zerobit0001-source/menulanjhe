from django.urls import path
from .views_public import StartTableSessionView

app_name = "table_sessions_public"

urlpatterns = [
    path("table_sessions/", StartTableSessionView.as_view(), name="start-table-session"),
]