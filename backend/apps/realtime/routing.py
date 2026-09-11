from django.urls import re_path
from .consumers import OrderConsumer

websocket_urlpatterns = [
    re_path(r"^ws/v1/orders/$", OrderConsumer.as_asgi()),
]