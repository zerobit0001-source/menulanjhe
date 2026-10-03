from django.urls import path

from .views import DashboardView, SalesReportView

app_name = "reports"

urlpatterns = [
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("reports/", SalesReportView.as_view(), name="sales-report"),
]