from django.contrib import admin
from .models import Category, Menu


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ["name", "branch", "is_active", "is_published"]
    list_filter = ["is_active", "is_published"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "menu", "sort_order", "is_active"]
    list_filter = ["is_active"]