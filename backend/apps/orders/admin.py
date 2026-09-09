from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ["product", "product_name", "unit_price", "quantity", "total_price"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "tenant", "branch", "status", "total", "created_at"]
    list_filter = ["status", "order_type"]
    inlines = [OrderItemInline]