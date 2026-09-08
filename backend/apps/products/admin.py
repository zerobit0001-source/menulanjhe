from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "is_available", "is_featured"]
    list_filter = ["is_available", "is_featured"]
    search_fields = ["name"]