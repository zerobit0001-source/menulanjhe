from django.contrib import admin
from .models import Branch


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ["name", "tenant", "is_active", "is_default"]
    list_filter = ["is_active", "is_default"]
    search_fields = ["name"]