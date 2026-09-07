from django.urls import path
from .views import RestaurantProfileView

app_name = "restaurants"

urlpatterns = [
    path("restaurant_profile/", RestaurantProfileView.as_view(), name="restaurant-profile"),
]