from django.core.validators import MinValueValidator
from django.db import models
from apps.common.models import UUIDTimeStampedModel

ORDER_TYPE_CHOICES = [
    ("DINE_IN", "Dine In"),
    ("TAKEAWAY", "Takeaway"),
    ("DELIVERY", "Delivery"),
]

ORDER_STATUS_CHOICES = [
    ("PENDING", "Pending"),
    ("CONFIRMED", "Confirmed"),
    ("COMPLETED", "Completed"),
    ("CANCELLED", "Cancelled"),
]


class Order(UUIDTimeStampedModel):
    tenant = models.ForeignKey("tenants.Tenant", on_delete=models.PROTECT, related_name="orders")
    branch = models.ForeignKey("branches.Branch", on_delete=models.PROTECT, related_name="orders")

    table = models.ForeignKey(
        "tables.Table", null=True, blank=True, on_delete=models.SET_NULL, related_name="orders"
    )
    table_session = models.ForeignKey(
        "table_sessions.TableSession", null=True, blank=True, on_delete=models.SET_NULL, related_name="orders"
    )
    customer = models.ForeignKey(
        "customers.Customer", null=True, blank=True, on_delete=models.SET_NULL, related_name="orders"
    )

    order_type = models.CharField(max_length=20, choices=ORDER_TYPE_CHOICES, default="DINE_IN")
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default="PENDING")

    idempotency_key = models.CharField(max_length=100, db_index=True)

    subtotal = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    discount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])

    notes = models.TextField(blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["tenant", "idempotency_key"], name="uniq_order_idempotency_per_tenant"),
        ]
        indexes = [
            models.Index(fields=["tenant", "status", "created_at"]),
            models.Index(fields=["branch", "status"]),
        ]

    def __str__(self):
        return f"Order({self.id}) - {self.status}"


class OrderItem(UUIDTimeStampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey("products.Product", null=True, on_delete=models.SET_NULL, related_name="order_items")

    product_name = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total_price = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.product_name} x{self.quantity}"