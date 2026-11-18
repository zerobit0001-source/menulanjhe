from decimal import Decimal, ROUND_HALF_UP

from django.db import transaction
from django.utils import timezone

from apps.common.exceptions import ApplicationError

from .models import Product

MAX_PRICE = Decimal("9999999999")


def _calculate_new_price(old_price: Decimal, percent: Decimal, round_to: int) -> Decimal:
    raw = old_price * (Decimal(100) + percent) / Decimal(100)
    step = Decimal(round_to)
    return (raw / step).quantize(Decimal("1"), rounding=ROUND_HALF_UP) * step


def adjust_category_prices(*, category, percent: Decimal, round_to: int = 1, dry_run: bool = False) -> dict:
    with transaction.atomic():
        products = list(
            Product.objects.select_for_update().filter(category=category).order_by("sort_order", "name")
        )
        if not products:
            raise ApplicationError("این دسته‌بندی محصولی ندارد.", code="EMPTY_CATEGORY")

        now = timezone.now()
        changes = []
        for product in products:
            old_price = product.price
            new_price = _calculate_new_price(old_price, percent, round_to)
            if new_price > MAX_PRICE:
                raise ApplicationError(
                    f"قیمت جدید «{product.name}» بیش از حد مجاز می‌شود.", code="PRICE_TOO_HIGH"
                )
            if old_price > 0 and new_price <= 0:
                raise ApplicationError(
                    f"قیمت جدید «{product.name}» صفر یا منفی می‌شود. گرد کردن را کمتر کنید.",
                    code="PRICE_TOO_LOW",
                )
            changes.append({"id": product.id, "name": product.name, "old": old_price, "new": new_price})
            if not dry_run:
                product.price = new_price
                product.updated_at = now

        if not dry_run:
            Product.objects.bulk_update(products, ["price", "updated_at"])

    return {
        "category": {"id": category.id, "name": category.name},
        "percent": str(percent),
        "round_to": round_to,
        "dry_run": dry_run,
        "updated_count": 0 if dry_run else len(changes),
        "products": [
            {"id": c["id"], "name": c["name"], "old_price": int(c["old"]), "new_price": int(c["new"])}
            for c in changes
        ],
    }