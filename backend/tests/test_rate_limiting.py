import pytest
from rest_framework.test import APIClient

from tests.conftest import PASSWORD, guest_order_payload

LOGIN = "/api/v1/auth/login/"
ORDERS = "/api/v1/public/orders/"


def client_from(ip):
    return APIClient(REMOTE_ADDR=ip)


def bad_login(client, phone="09121110001"):
    return client.post(LOGIN, {"phone_number": phone, "password": "wrong"}, format="json")


# ------------------------------------------------------------------ login
def test_login_blocked_after_too_many_attempts_from_one_ip(set_rates, tenant_a):
    set_rates(auth_login="3/min")
    anon = client_from("10.0.0.1")
    # شماره‌های مختلف تا فقط محدودیت IP تست بشه، نه محدودیت شماره
    for i in range(3):
        assert bad_login(anon, f"0912000000{i}").status_code == 401
    res = bad_login(anon, "09120000009")
    assert res.status_code == 429
    body = res.json()
    assert body["ok"] is False and body["code"] == "RATE_LIMITED"
    assert isinstance(body["retry_after"], int) and 1 <= body["retry_after"] <= 61
    assert res.headers["Retry-After"]


def test_blocked_ip_cannot_login_even_with_correct_password(set_rates, tenant_a):
    set_rates(auth_login="2/min")
    anon = client_from("10.0.0.2")
    bad_login(anon), bad_login(anon)
    res = anon.post(LOGIN, {"phone_number": tenant_a[1].phone_number, "password": PASSWORD}, format="json")
    assert res.status_code == 429


def test_other_ips_are_not_affected(set_rates, tenant_a):
    set_rates(auth_login="2/min")
    attacker = client_from("10.0.0.3")
    for _ in range(3):
        bad_login(attacker)
    assert bad_login(attacker).status_code == 429
    ok = client_from("10.0.0.4").post(LOGIN, {"phone_number": tenant_a[1].phone_number, "password": PASSWORD}, format="json")
    assert ok.status_code == 200


def test_password_guessing_on_one_account_is_limited_across_many_ips(set_rates, tenant_a):
    """مهاجم IP عوض می‌کنه ولی روی یک شماره‌ی هدف رمز حدس می‌زنه → بر اساس شماره بلاک می‌شه."""
    set_rates(auth_login_phone="3/min")
    phone = tenant_a[1].phone_number
    for i in range(3):
        assert bad_login(client_from(f"10.1.0.{i}"), phone).status_code == 401
    res = bad_login(client_from("10.1.0.99"), phone)  # IP کاملاً جدید
    assert res.status_code == 429 and res.json()["code"] == "RATE_LIMITED"
    # شماره‌ی دیگه از همون IP آزاده
    assert bad_login(client_from("10.1.0.99"), "09128888888").status_code == 401


def test_normal_logins_are_not_limited_with_default_rates(anon, tenant_a):
    for _ in range(15):
        res = anon.post(LOGIN, {"phone_number": tenant_a[1].phone_number, "password": PASSWORD}, format="json")
        assert res.status_code == 200


def test_login_without_phone_does_not_crash_phone_throttle(set_rates, anon, db):
    set_rates(auth_login_phone="1/min")
    for _ in range(3):
        assert anon.post(LOGIN, {"password": "x"}, format="json").status_code == 400


# ------------------------------------------------------------------ public orders
def test_one_table_cannot_spam_orders(set_rates, anon, catalog_a):
    set_rates(public_order_table="3/min")
    for i in range(3):
        assert anon.post(ORDERS, guest_order_payload(catalog_a, f"spam-{i}"), format="json").status_code == 201
    res = anon.post(ORDERS, guest_order_payload(catalog_a, "spam-4"), format="json")
    assert res.status_code == 429 and res.json()["code"] == "RATE_LIMITED"


def test_other_tables_are_not_blocked_by_one_noisy_table(set_rates, catalog_a, catalog_b):
    """مشتری‌های یک کافه با یک WiFi (یک IP) هستن؛ میز شلوغ نباید میز بقیه رو بلاک کنه."""
    from apps.tables.models import Table

    set_rates(public_order_table="2/min")
    anon = client_from("10.2.0.1")
    for i in range(2):
        anon.post(ORDERS, guest_order_payload(catalog_a, f"n-{i}"), format="json")
    assert anon.post(ORDERS, guest_order_payload(catalog_a, "n-3"), format="json").status_code == 429

    table2 = Table.objects.create(branch=catalog_a["branch"], name="T2", number=2, capacity=2)
    payload = guest_order_payload(catalog_a, "other-table")
    payload["qr_token"] = table2.qr_token
    assert anon.post(ORDERS, payload, format="json").status_code == 201


def test_per_ip_limit_on_orders(set_rates, catalog_a):
    from apps.tables.models import Table

    set_rates(public_order="2/min")
    anon = client_from("10.2.0.2")
    tables = [catalog_a["table"]] + [Table.objects.create(branch=catalog_a["branch"], name=f"X{i}", number=10 + i, capacity=2)
                                     for i in range(2)]
    codes = []
    for i, table in enumerate(tables):
        payload = guest_order_payload(catalog_a, f"ip-{i}")
        payload["qr_token"] = table.qr_token
        codes.append(anon.post(ORDERS, payload, format="json").status_code)
    assert codes == [201, 201, 429]


def test_throttled_order_attempt_creates_nothing(set_rates, anon, catalog_a):
    from apps.orders.models import Order

    set_rates(public_order_table="1/min")
    anon.post(ORDERS, guest_order_payload(catalog_a, "a1"), format="json")
    assert anon.post(ORDERS, guest_order_payload(catalog_a, "a2"), format="json").status_code == 429
    assert Order.objects.count() == 1


def test_idempotent_retry_with_unique_key_still_counts(set_rates, anon, catalog_a):
    set_rates(public_order_table="2/min")
    for _ in range(2):
        assert anon.post(ORDERS, guest_order_payload(catalog_a, "same-key"), format="json").status_code == 201
    assert anon.post(ORDERS, guest_order_payload(catalog_a, "same-key"), format="json").status_code == 429


# ------------------------------------------------------------------ public read endpoints
def test_resolve_endpoint_is_limited(set_rates, catalog_a):
    set_rates(public_resolve="3/min")
    anon = client_from("10.3.0.1")
    url = f"/api/v1/public/tables/resolve/{catalog_a['table'].qr_token}/"
    assert [anon.get(url).status_code for _ in range(4)] == [200, 200, 200, 429]


def test_resolve_token_guessing_is_limited(set_rates, db):
    set_rates(public_resolve="5/min")
    anon = client_from("10.3.0.2")
    codes = [anon.get(f"/api/v1/public/tables/resolve/guess-{i}/").status_code for i in range(7)]
    assert codes[:5] == [404] * 5 and codes[5:] == [429, 429]


def test_public_menu_is_limited(set_rates, catalog_a):
    set_rates(public_menu="2/min")
    anon = client_from("10.3.0.3")
    url = f"/api/v1/public/menus/{catalog_a['menu'].slug}/"
    assert [anon.get(url).status_code for _ in range(3)] == [200, 200, 429]


# ------------------------------------------------------------------ spoofing
def test_fake_x_forwarded_for_does_not_bypass_limit(set_rates, catalog_a):
    """NUM_PROXIES=0 (پیش‌فرض): هدر جعلی نادیده گرفته می‌شه و همه یک IP حساب می‌شن."""
    set_rates(public_resolve="2/min")
    anon = client_from("10.4.0.1")
    url = f"/api/v1/public/tables/resolve/{catalog_a['table'].qr_token}/"
    codes = [anon.get(url, HTTP_X_FORWARDED_FOR=f"1.2.3.{i}").status_code for i in range(4)]
    assert codes == [200, 200, 429, 429]


def test_behind_one_proxy_client_cannot_spoof_by_prepending_hops(set_rates, settings, catalog_a):
    """پشت Nginx (NUM_PROXIES=1): فقط آخرین IP (که خود Nginx اضافه کرده) ملاکه."""
    settings.REST_FRAMEWORK = {**settings.REST_FRAMEWORK, "NUM_PROXIES": 1}
    set_rates(public_resolve="2/min")
    anon = client_from("127.0.0.1")
    url = f"/api/v1/public/tables/resolve/{catalog_a['table'].qr_token}/"
    codes = [anon.get(url, HTTP_X_FORWARDED_FOR=f"{fake}, 203.0.113.7").status_code
             for fake in ("9.9.9.1", "9.9.9.2", "9.9.9.3")]
    assert codes == [200, 200, 429]
    # یک کاربر واقعیِ دیگه (IP دیگه پشت همون Nginx) آزاده
    assert anon.get(url, HTTP_X_FORWARDED_FOR="198.51.100.4").status_code == 200


# ------------------------------------------------------------------ authenticated endpoints
def test_change_password_is_limited_per_user(set_rates, make_fast_client, tenant_a):
    set_rates(auth_change_password="2/min")
    client = make_fast_client(tenant_a[1])
    body = {"old_password": "wrong", "new_password": "NewPass98765!"}
    assert client.post("/api/v1/auth/change_password/", body, format="json").status_code == 400
    assert client.post("/api/v1/auth/change_password/", body, format="json").status_code == 400
    assert client.post("/api/v1/auth/change_password/", body, format="json").status_code == 429


def test_refresh_is_limited(set_rates, anon, tenant_a):
    set_rates(auth_refresh="2/min")
    refresh = anon.post(LOGIN, {"phone_number": tenant_a[1].phone_number, "password": PASSWORD}, format="json").json()["refresh"]
    codes = [anon.post("/api/v1/auth/refresh/", {"refresh": refresh}, format="json").status_code for _ in range(3)]
    assert codes[2] == 429


def test_regular_admin_api_is_not_throttled(set_rates, owner_a, catalog_a):
    set_rates(**{k: "1/min" for k in ("auth_login", "public_menu", "public_resolve", "public_order", "public_order_table")})
    for _ in range(30):
        assert owner_a.get("/api/v1/admin/products/").status_code == 200


def test_limits_reset_after_window(set_rates, monkeypatch, catalog_a):
    """بعد از گذشتن پنجره‌ی زمانی، دوباره آزاد می‌شه."""
    import rest_framework.throttling as t

    now = [1000.0]
    monkeypatch.setattr(t.SimpleRateThrottle, "timer", staticmethod(lambda: now[0]))
    set_rates(public_resolve="2/min")
    anon = client_from("10.5.0.1")
    url = f"/api/v1/public/tables/resolve/{catalog_a['table'].qr_token}/"
    assert [anon.get(url).status_code for _ in range(3)] == [200, 200, 429]
    now[0] += 61
    assert anon.get(url).status_code == 200
