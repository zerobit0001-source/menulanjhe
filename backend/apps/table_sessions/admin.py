from django.contrib import admin
from .models import TableSession


@admin.register(TableSession)
class TableSessionAdmin(admin.ModelAdmin):
    list_display = ["table", "status", "created_at", "closed_at"]
    list_filter = ["status"]