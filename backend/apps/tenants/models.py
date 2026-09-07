from django.conf import settings
from django.db import models
from apps.common.models import UUIDTimeStampedModel


class Tenant(UUIDTimeStampedModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Permission(models.Model):
    codename = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["codename"]

    def __str__(self):
        return self.codename


class Role(UUIDTimeStampedModel):
    tenant = models.ForeignKey(Tenant, null=True, blank=True, on_delete=models.CASCADE, related_name="custom_roles")
    name = models.CharField(max_length=100)
    codename = models.SlugField(max_length=100)
    is_system = models.BooleanField(default=False)
    rank = models.PositiveIntegerField(default=0)
    permissions = models.ManyToManyField(Permission, through="RolePermission", related_name="roles")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["tenant", "codename"], name="uniq_role_codename_per_tenant"),
        ]
        ordering = ["-rank", "name"]

    def __str__(self):
        return self.name


class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["role", "permission"], name="uniq_role_permission"),
        ]


class Membership(UUIDTimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="memberships")
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name="memberships")
    role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name="memberships")
    branch = models.ForeignKey("branches.Branch", on_delete=models.SET_NULL, related_name="memberships", null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "tenant"], name="uniq_user_tenant_membership"),
        ]
        indexes = [
            models.Index(fields=["user", "tenant"]),
        ]

    def __str__(self):
        return f"{self.user} - {self.tenant} - {self.role}"

    def has_permission(self, codename: str) -> bool:
        if not self.is_active:
            return False
        return self.role.permissions.filter(codename=codename).exists()