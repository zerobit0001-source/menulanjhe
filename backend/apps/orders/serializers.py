from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "unit_price", "quantity", "total_price"]
        read_only_fields = fields


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "branch", "table", "table_session", "customer", "order_type", "status",
            "subtotal", "discount", "total", "notes", "items", "created_at", "updated_at",
        ]
        read_only_fields = fields


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1)


class GuestCustomerInputSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, allow_blank=True, max_length=255)
    phone = serializers.CharField(required=False, allow_blank=True, max_length=20)
    notes = serializers.CharField(required=False, allow_blank=True)


class CreateDineInOrderSerializer(serializers.Serializer):
    session_token = serializers.CharField()
    idempotency_key = serializers.CharField(max_length=100)
    items = OrderItemInputSerializer(many=True)
    customer = GuestCustomerInputSerializer(required=False)
    notes = serializers.CharField(required=False, allow_blank=True)