from django.contrib import admin
from .models import RestaurantProfile


@admin.register(RestaurantProfile)
class RestaurantProfileAdmin(admin.ModelAdmin):
    list_display = ["name", "tenant", "phone"]