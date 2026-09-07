from django.contrib import admin

from .models import Membership, Permission, Role, Tenant


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "is_active", "created_at"]
    search_fields = ["name", "slug"]


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ["name", "codename", "tenant", "is_system", "rank"]
    list_filter = ["is_system"]


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    list_display = ["codename", "description"]
    search_fields = ["codename"]


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ["user", "tenant", "role", "is_active"]
    list_filter = ["is_active", "role"]