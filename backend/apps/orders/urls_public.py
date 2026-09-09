from django.urls import path
from .views_public import CreateGuestOrderView

app_name = "orders_public"

urlpatterns = [
    path("orders/", CreateGuestOrderView.as_view(), name="create-guest-order"),
]