from django.db.models import Count, Q
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.menus.models import Category
from apps.menus.serializers import AdminCategorySerializer
from apps.orders.models import Order
from apps.orders.serializers import OrderSerializer
from apps.products.models import Product
from apps.products.serializers import AdminProductSerializer
from apps.tenants.permissions import HasTenantPermission
from .serializers import DashboardCategorySerializer


class DashboardView(APIView):
    permission_classes = [HasTenantPermission]
    required_permission = "reports.view"

    def get(self, request):
        tenant = request.tenant
        context = {"request": request}

        products_qs = Product.objects.filter(category__menu__branch__tenant=tenant)
        categories_qs = Category.objects.filter(menu__branch__tenant=tenant)
        orders_qs = Order.objects.filter(tenant=tenant)

        product_counts = products_qs.aggregate(
            total=Count("id"),
            active=Count("id", filter=Q(is_available=True)),
        )

        summary = {
            "product_count": product_counts["total"],
            "category_count": categories_qs.count(),
            "active_product_count": product_counts["active"],
            "pending_order_count": orders_qs.filter(status="PENDING").count(),
        }

        # categories = categories_qs.select_related("menu").order_by("-created_at")[:5]

        categories = (
            categories_qs.select_related("menu")
            .annotate(product_count=Count("products"))
            .order_by("-created_at")[:5]
        )
        products = products_qs.select_related("category").order_by("-created_at")[:10]
        recent_orders = (
            orders_qs.select_related("branch", "table", "customer")
            .prefetch_related("items")
            .order_by("-created_at")[:5]
        )

        return Response(
            {
                "summary": summary,
                # "categories": AdminCategorySerializer(categories, many=True, context=context).data,
                "categories": DashboardCategorySerializer(categories, many=True, context=context).data,
                "products": AdminProductSerializer(products, many=True, context=context).data,
                "recent_orders": OrderSerializer(recent_orders, many=True, context=context).data,
            }
        )