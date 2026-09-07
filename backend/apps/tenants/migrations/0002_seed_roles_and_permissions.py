from django.db import migrations
from apps.tenants.permission_matrix import PERMISSIONS, ROLES, ROLE_PERMISSIONS


def seed_data(apps, schema_editor):
    Permission = apps.get_model("tenants", "Permission")
    Role = apps.get_model("tenants", "Role")
    RolePermission = apps.get_model("tenants", "RolePermission")

    perm_objs = {}
    for codename, description in PERMISSIONS:
        perm_objs[codename] = Permission.objects.create(codename=codename, description=description)

    for codename, info in ROLES.items():
        role = Role.objects.create(
            tenant=None, name=info["name"], codename=codename,
            is_system=True, rank=info["rank"],
        )
        for perm_codename in ROLE_PERMISSIONS[codename]:
            RolePermission.objects.create(role=role, permission=perm_objs[perm_codename])


def reverse_seed(apps, schema_editor):
    Role = apps.get_model("tenants", "Role")
    Permission = apps.get_model("tenants", "Permission")
    Role.objects.filter(is_system=True).delete()
    Permission.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("tenants", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_data, reverse_seed),
    ]