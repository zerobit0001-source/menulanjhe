from django.contrib import admin
from .models import Table


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ["name", "number", "branch", "is_active"]
    list_filter = ["is_active"]