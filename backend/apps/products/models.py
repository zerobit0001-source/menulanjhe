from django.core.validators import MinValueValidator
from django.db import models
from apps.common.models import UUIDTimeStampedModel


class Product(UUIDTimeStampedModel):
    category = models.ForeignKey("menus.Category", on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="products/", null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        indexes = [models.Index(fields=["category", "is_available"])]
        ordering = ["sort_order", "name"]

    def __str__(self):
        return f"{self.name} ({self.price})"