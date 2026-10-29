import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from apps.menus.models import Category, Menu
from apps.products.models import Product
from apps.tables.models import Table
from apps.tenants.models import Membership, Role
from apps.tenants.services import onboard_new_tenant

User = get_user_model()


@pytest.fixture
def anon():
    return APIClient()


def _client_for(user, tenant=None):
    client = APIClient()
    res = client.post("/api/v1/auth/login/", {"phone_number": user.phone_number, "password": "Pass12345!"})
    assert res.status_code == 200, res.content
    token = res.json()["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    if tenant is not None:
        res = client.post("/api/v1/auth/select_tenant/", {"tenant_id": str(tenant.id)})
        assert res.status_code == 200, res.content
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {res.json()['access']}")
    return client


@pytest.fixture
def make_client():
    return _client_for


@pytest.fixture
def platform_admin(db):
    return User.objects.create_superuser(phone_number="09000000000", password="Pass12345!")


def _make_tenant(phone, slug):
    result = onboard_new_tenant(
        phone_number=phone, full_name=f"Owner {slug}", tenant_name=f"Cafe {slug}", tenant_slug=slug
    )
    user = result["user"]
    user.set_password("Pass12345!")
    user.save()
    return result["tenant"], user


@pytest.fixture
def tenant_a(db):
    return _make_tenant("09121110001", "cafe-a")


@pytest.fixture
def tenant_b(db):
    return _make_tenant("09121110002", "cafe-b")


@pytest.fixture
def owner_a(tenant_a):
    tenant, user = tenant_a
    return _client_for(user, tenant)


@pytest.fixture
def owner_b(tenant_b):
    tenant, user = tenant_b
    return _client_for(user, tenant)


@pytest.fixture
def staff_client(make_client):
    def _make(tenant, role_codename, phone):
        user = User.objects.create_user(phone_number=phone, password="Pass12345!", full_name=role_codename)
        role = Role.objects.get(is_system=True, codename=role_codename)
        Membership.objects.create(user=user, tenant=tenant, role=role)
        return make_client(user, tenant)

    return _make


@pytest.fixture
def catalog_a(tenant_a):
    tenant, _ = tenant_a
    branch = tenant.branches.get(is_default=True)
    menu = Menu.objects.create(branch=branch, name="Main", slug="main-a", is_published=True)
    category = Category.objects.create(menu=menu, name="Coffee")
    espresso = Product.objects.create(category=category, name="Espresso", slug="espresso", price=45000)
    latte = Product.objects.create(category=category, name="Latte", slug="latte", price=60000)
    table = Table.objects.create(branch=branch, name="T1", number=1, capacity=4)
    return {"tenant": tenant, "branch": branch, "menu": menu, "category": category,
            "espresso": espresso, "latte": latte, "table": table}


@pytest.fixture
def catalog_b(tenant_b):
    tenant, _ = tenant_b
    branch = tenant.branches.get(is_default=True)
    menu = Menu.objects.create(branch=branch, name="Main", slug="main-b", is_published=True)
    category = Category.objects.create(menu=menu, name="Tea")
    tea = Product.objects.create(category=category, name="Tea", slug="tea", price=20000)
    table = Table.objects.create(branch=branch, name="T1", number=1, capacity=2)
    return {"tenant": tenant, "branch": branch, "menu": menu, "category": category, "tea": tea, "table": table}


def guest_order_payload(catalog, key="key-1", qty=2):
    return {
        "qr_token": catalog["table"].qr_token,
        "idempotency_key": key,
        "items": [{"product_id": str(catalog["espresso"].id), "quantity": qty}],
    }


@pytest.fixture(autouse=True)
def media_tmp(settings, tmp_path):
    settings.MEDIA_ROOT = tmp_path
