from django.db import models
from apps.common.models import UUIDTimeStampedModel


class Menu(UUIDTimeStampedModel):
    branch = models.ForeignKey("branches.Branch", on_delete=models.CASCADE, related_name="menus")
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["branch", "slug"], name="uniq_menu_slug_per_branch"),
        ]

    def __str__(self):
        return f"{self.name} ({self.branch_id})"


class Category(UUIDTimeStampedModel):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="categories/", null=True, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [models.Index(fields=["menu", "sort_order"])]
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name