from datetime import datetime, timedelta
from django.db.models import Count, Q, Sum
from django.db.models.functions import TruncDate
from django.utils import timezone
from apps.orders.models import Order, OrderItem


class InvalidReportPeriod(Exception):
    pass


def get_period_range(period: str, from_param: str | None = None, to_param: str | None = None):
    tz = timezone.get_current_timezone()
    now = timezone.localtime(timezone.now(), tz)

    if period == "today":
        start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end = now
    elif period == "week":
        start = (now - timedelta(days=6)).replace(hour=0, minute=0, second=0, microsecond=0)
        end = now.replace(hour=23, minute=59, second=59, microsecond=999999)
    elif period == "month":
        start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end = now.replace(hour=23, minute=59, second=59, microsecond=999999)
    elif period == "custom":
        if not from_param or not to_param:
            raise InvalidReportPeriod("برای period=custom، from و to الزامی هستند.")
        try:
            start = timezone.make_aware(datetime.fromisoformat(from_param), tz) \
                if timezone.is_naive(datetime.fromisoformat(from_param)) else datetime.fromisoformat(from_param)
            end = timezone.make_aware(datetime.fromisoformat(to_param), tz) \
                if timezone.is_naive(datetime.fromisoformat(to_param)) else datetime.fromisoformat(to_param)
        except ValueError:
            raise InvalidReportPeriod("فرمت from/to نامعتبر است. از ISO 8601 استفاده کنید.")
        if start > end:
            raise InvalidReportPeriod("from نمی‌تواند بعد از to باشد.")
    else:
        raise InvalidReportPeriod("period نامعتبر است. مقادیر مجاز: today, week, month, custom")

    return start, end


def build_sales_report(*, tenant, period: str, from_param=None, to_param=None, top_limit: int = 10):
    start, end = get_period_range(period, from_param, to_param)

    orders_qs = Order.objects.filter(tenant=tenant, created_at__range=(start, end))
    completed_qs = orders_qs.filter(status="COMPLETED")

    status_counts = orders_qs.aggregate(
        total=Count("id"),
        pending=Count("id", filter=Q(status="PENDING")),
        confirmed=Count("id", filter=Q(status="CONFIRMED")),
        completed=Count("id", filter=Q(status="COMPLETED")),
        cancelled=Count("id", filter=Q(status="CANCELLED")),
    )

    money = completed_qs.aggregate(gross=Sum("subtotal"), discount=Sum("discount"), net=Sum("total"))
    gross_sales = int(money["gross"] or 0)
    discount_total = int(money["discount"] or 0)
    net_sales = int(money["net"] or 0)
    completed_count = status_counts["completed"]
    average_order_value = int(net_sales / completed_count) if completed_count else 0

    summary = {
        "orders_count": status_counts["total"],
        "completed_orders_count": status_counts["completed"],
        "cancelled_orders_count": status_counts["cancelled"],
        "pending_orders_count": status_counts["pending"],
        "confirmed_orders_count": status_counts["confirmed"],
        "gross_sales": gross_sales,
        "discount_total": discount_total,
        "net_sales": net_sales,
        "average_order_value": average_order_value,
    }

    orders_by_status = {
        "pending": status_counts["pending"],
        "confirmed": status_counts["confirmed"],
        "completed": status_counts["completed"],
        "cancelled": status_counts["cancelled"],
    }

    top_products_qs = (
        OrderItem.objects.filter(order__in=completed_qs)
        .values("product_id", "product_name")
        .annotate(quantity=Sum("quantity"), sales=Sum("total_price"))
        .order_by("-sales")[:top_limit]
    )
    top_products = [
        {
            "product_id": str(row["product_id"]) if row["product_id"] else None,
            "product_name": row["product_name"],
            "quantity": row["quantity"],
            "sales": int(row["sales"]),
        }
        for row in top_products_qs
    ]

    top_categories_qs = (
        OrderItem.objects.filter(order__in=completed_qs, product__isnull=False)
        .values("product__category_id", "product__category__name")
        .annotate(quantity=Sum("quantity"), sales=Sum("total_price"))
        .order_by("-sales")[:top_limit]
    )
    top_categories = [
        {
            "category_id": str(row["product__category_id"]),
            "category_name": row["product__category__name"],
            "quantity": row["quantity"],
            "sales": int(row["sales"]),
        }
        for row in top_categories_qs
    ]

    result = {
        "period": period,
        "from": start.isoformat(),
        "to": end.isoformat(),
        "summary": summary,
        "orders_by_status": orders_by_status,
        "top_products": top_products,
        "top_categories": top_categories,
    }

    if period != "today":
        orders_per_day = {
            row["day"]: row["orders_count"]
            for row in orders_qs.annotate(day=TruncDate("created_at"))
            .values("day").annotate(orders_count=Count("id"))
        }
        sales_per_day = {
            row["day"]: row["sales"] or 0
            for row in completed_qs.annotate(day=TruncDate("created_at"))
            .values("day").annotate(sales=Sum("total"))
        }

        sales_by_day = []
        current = start.date()
        end_date = end.date()
        while current <= end_date:
            sales_by_day.append({
                "date": current.isoformat(),
                "orders_count": orders_per_day.get(current, 0),
                "sales": int(sales_per_day.get(current, 0)),
            })
            current += timedelta(days=1)

        result["sales_by_day"] = sales_by_day

    return result