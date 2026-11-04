import pytest
from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework.test import APIClient
from rest_framework.throttling import SimpleRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken

from apps.menus.models import Category, Menu
from apps.products.models import Product
from apps.tables.models import Table
from apps.tenants.models import Membership, Role
from apps.tenants.services import onboard_new_tenant

User = get_user_model()
PASSWORD = "Pass12345!"


# ---------------------------------------------------------------- autouse
@pytest.fixture(autouse=True)
def media_tmp(settings, tmp_path):
    """فایل‌های آپلودی تست‌ها تو پوشه‌ی موقت می‌رن، نه تو media/ پروژه."""
    settings.MEDIA_ROOT = tmp_path


@pytest.fixture(autouse=True)
def clear_cache_between_tests():
    """شمارنده‌های Rate Limit تو کش هستن؛ نباید بین تست‌ها نشت کنن."""
    cache.clear()
    yield
    cache.clear()


@pytest.fixture
def set_rates(monkeypatch):
    """نرخ Rate Limit یک یا چند scope رو برای همون تست پایین می‌آره. مثال: set_rates(public_order='3/min')"""

    def _set(**rates):
        for scope, rate in rates.items():
            monkeypatch.setitem(SimpleRateThrottle.THROTTLE_RATES, scope, rate)

    return _set


# ---------------------------------------------------------------- clients
@pytest.fixture
def anon():
    return APIClient()


def token_for(user, tenant=None) -> str:
    """توکن مستقیم (بدون درخواست HTTP) — برای تست‌هایی که Login خودش موضوعشون نیست."""
    refresh = RefreshToken.for_user(user)
    if tenant is not None:
        refresh["active_tenant_id"] = str(tenant.id)
    return str(refresh.access_token)


def fast_client(user, tenant=None) -> APIClient:
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token_for(user, tenant)}")
    return client


def login_client(user, tenant=None) -> APIClient:
    """لاگین واقعی از طریق API (و Select-Tenant اگه tenant داده بشه)، دقیقاً مثل Frontend."""
    client = APIClient()
    res = client.post("/api/v1/auth/login/", {"phone_number": user.phone_number, "password": PASSWORD})
    assert res.status_code == 200, res.content
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {res.json()['access']}")
    if tenant is not None:
        res = client.post("/api/v1/auth/select_tenant/", {"tenant_id": str(tenant.id)})
        assert res.status_code == 200, res.content
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {res.json()['access']}")
    return client


@pytest.fixture
def make_client():
    return login_client


@pytest.fixture
def make_fast_client():
    return fast_client


# ---------------------------------------------------------------- tenants & users
@pytest.fixture
def platform_admin(db):
    return User.objects.create_superuser(phone_number="09000000000", password=PASSWORD)


def _make_tenant(phone, slug):
    result = onboard_new_tenant(
        phone_number=phone, full_name=f"Owner {slug}", tenant_name=f"Cafe {slug}", tenant_slug=slug
    )
    user = result["user"]
    user.set_password(PASSWORD)
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
    return fast_client(user, tenant)


@pytest.fixture
def owner_b(tenant_b):
    tenant, user = tenant_b
    return fast_client(user, tenant)


@pytest.fixture
def staff_client():
    """ساخت کاربر با نقش دلخواه داخل یک tenant و برگردوندن (client, user, membership)."""

    def _make(tenant, role_codename, phone):
        user = User.objects.create_user(phone_number=phone, password=PASSWORD, full_name=role_codename)
        role = Role.objects.get(is_system=True, codename=role_codename)
        membership = Membership.objects.create(user=user, tenant=tenant, role=role)
        client = fast_client(user, tenant)
        client.user, client.membership = user, membership
        return client

    return _make


# ---------------------------------------------------------------- catalogs
def _catalog(tenant, suffix, product_name, price):
    branch = tenant.branches.get(is_default=True)
    menu = Menu.objects.create(branch=branch, name=f"Main {suffix}", slug=f"main-{suffix}", is_published=True)
    category = Category.objects.create(menu=menu, name=f"Cat {suffix}")
    product = Product.objects.create(category=category, name=product_name, slug=product_name.lower(), price=price)
    table = Table.objects.create(branch=branch, name="T1", number=1, capacity=4)
    return {"tenant": tenant, "branch": branch, "menu": menu, "category": category, "table": table,
            "espresso": product}


@pytest.fixture
def catalog_a(tenant_a):
    data = _catalog(tenant_a[0], "a", "Espresso", 45000)
    data["latte"] = Product.objects.create(category=data["category"], name="Latte", slug="latte", price=60000)
    return data


@pytest.fixture
def catalog_b(tenant_b):
    data = _catalog(tenant_b[0], "b", "Tea", 20000)
    data["tea"] = data["espresso"]
    return data


def guest_order_payload(catalog, key="key-1", qty=2, product="espresso"):
    return {
        "qr_token": catalog["table"].qr_token,
        "idempotency_key": key,
        "items": [{"product_id": str(catalog[product].id), "quantity": qty}],
    }


@pytest.fixture
def place_order(anon):
    """سفارش مهمان می‌ده و Order رو برمی‌گردونه."""
    from apps.orders.models import Order

    def _place(catalog, key="k1", qty=2, product="espresso"):
        res = anon.post("/api/v1/public/orders/", guest_order_payload(catalog, key, qty, product), format="json")
        assert res.status_code == 201, res.content
        return Order.objects.get(id=res.json()["id"])

    return _place
