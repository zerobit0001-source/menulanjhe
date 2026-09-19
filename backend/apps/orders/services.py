# from django.db import transaction
# from apps.table_sessions.models import TableSession
# from .exceptions import InvalidStateTransition, InvalidTableSession, ProductNotAvailable
# from .models import Order, OrderItem
# from apps.products.models import Product
# from apps.orders.serializers import OrderSerializer
# from apps.realtime.events import dispatch_order_event
# from apps.customers.models import Customer
# import uuid
# 
# 
# 
# ALLOWED_TRANSITIONS = {
#     "PENDING": {"CONFIRMED", "CANCELLED"},
#     "CONFIRMED": {"COMPLETED", "CANCELLED"},
#     "COMPLETED": set(),
#     "CANCELLED": set(),
# }
# 
# def _serialize_order_for_event(order: Order) -> dict:
#     return {
#         "id": str(order.id),
#         "status": order.status,
#         "table_id": str(order.table_id) if order.table_id else None,
#         "total": str(order.total),
#         "created_at": order.created_at.isoformat(),
#     }
# 
# 
# def _build_order_items(*, order: Order, branch, items: list[dict]) -> int:
#     if not items:
#         raise ProductNotAvailable("سفارش باید حداقل یک آیتم داشته باشد.")
# 
#     subtotal = 0
#     order_items = []
#     for item in items:
#         product = Product.objects.select_for_update().filter(id=item["product_id"]).first()
#         if not product:
#             raise ProductNotAvailable(f"محصولی با شناسه {item['product_id']} پیدا نشد.")
#         if product.category.menu.branch_id != branch.id:
#             raise ProductNotAvailable(f"محصول «{product.name}» متعلق به این شعبه نیست.")
#         if not product.is_available:
#             raise ProductNotAvailable(f"محصول «{product.name}» در حال حاضر موجود نیست.")
# 
#         quantity = int(item["quantity"])
#         if quantity < 1:
#             raise ProductNotAvailable("تعداد باید حداقل ۱ باشد.")
# 
#         line_total = product.price * quantity
#         subtotal += line_total
# 
#         order_items.append(OrderItem(
#             order=order, product=product, product_name=product.name,
#             unit_price=product.price, quantity=quantity, total_price=line_total,
#         ))
# 
#     OrderItem.objects.bulk_create(order_items)
#     return subtotal
# 
# @transaction.atomic
# def create_dine_in_order(*, tenant, branch, session_token: str, items: list[dict],
#                           idempotency_key: str, customer_data: dict | None = None, notes: str = ""):
#     
# 
#     existing = Order.objects.select_for_update().filter(
#         tenant=tenant, idempotency_key=idempotency_key
#     ).first()
#     if existing:
#         return existing
# 
#     session = TableSession.objects.select_related("table__branch").filter(
#         session_token=session_token, status="OPEN"
#     ).first()
#     if not session:
#         raise InvalidTableSession("Table session نامعتبر یا بسته شده است.")
#     if session.table.branch_id != branch.id or session.table.branch.tenant_id != tenant.id:
#         raise InvalidTableSession("این Table Session متعلق به این شعبه/رستوران نیست.")
# 
#     if not items:
#         raise ProductNotAvailable("سفارش باید حداقل یک آیتم داشته باشد.")
# 
#     customer = None
#     if customer_data and (customer_data.get("name") or customer_data.get("phone")):
#         from apps.customers.models import Customer
# 
#         customer = Customer.objects.create(
#             tenant=tenant,
#             name=customer_data.get("name", ""),
#             phone=customer_data.get("phone", ""),
#             notes=customer_data.get("notes", ""),
#         )
# 
#     order = Order.objects.create(
#         tenant=tenant, branch=branch, table=session.table, table_session=session,
#         customer=customer, order_type="DINE_IN", status="PENDING",
#         idempotency_key=idempotency_key, subtotal=0, total=0, notes=notes,
#     )
# 
#     subtotal = 0
#     order_items = []
#     for item in items:
#         product = Product.objects.select_for_update().filter(id=item["product_id"]).first()
#         if not product:
#             raise ProductNotAvailable(f"محصولی با شناسه {item['product_id']} پیدا نشد.")
#         if product.category.menu.branch_id != branch.id:
#             raise ProductNotAvailable(f"محصول «{product.name}» متعلق به این شعبه نیست.")
#         if not product.is_available:
#             raise ProductNotAvailable(f"محصول «{product.name}» در حال حاضر موجود نیست.")
# 
#         quantity = int(item["quantity"])
#         if quantity < 1:
#             raise ProductNotAvailable("تعداد باید حداقل ۱ باشد.")
# 
#         line_total = product.price * quantity
#         subtotal += line_total
# 
#         order_items.append(OrderItem(
#             order=order, product=product, product_name=product.name,
#             unit_price=product.price, quantity=quantity, total_price=line_total,
#         ))
# 
#     OrderItem.objects.bulk_create(order_items)
# 
#     order.subtotal = subtotal
#     order.total = subtotal - order.discount
#     order.save(update_fields=["subtotal", "total", "updated_at"])
# 
#     # real-time phase...
# 
#     transaction.on_commit(lambda: dispatch_order_event(
#         tenant_id=tenant.id,
#         event_type="ORDER_CREATED",
#         order_data=_serialize_order_for_event(order),
#     ))
#     
#     return order
# 
# 
# @transaction.atomic
# def create_manual_order(*, tenant, branch, order_type: str, items: list[dict],
#                          idempotency_key: str | None = None, table=None,
#                          customer_data: dict | None = None, notes: str = "",
#                          created_by_membership=None):
#     if order_type not in ("DINE_IN", "TAKEAWAY"):
#         raise ProductNotAvailable("نوع سفارش نامعتبر است. فقط DINE_IN یا TAKEAWAY در دسترس است.")
# 
#     if order_type == "TAKEAWAY" and table is not None:
#         raise ProductNotAvailable("سفارش بیرون‌بر نباید به میز وصل باشد.")
# 
#     if table is not None and table.branch_id != branch.id:
#         raise ProductNotAvailable("این میز متعلق به این شعبه نیست.")
# 
#     if idempotency_key:
#         existing = Order.objects.select_for_update().filter(
#             tenant=tenant, idempotency_key=idempotency_key
#         ).first()
#         if existing:
#             return existing
#     else:
#         idempotency_key = f"manual-{uuid.uuid4()}"
# 
#     customer = None
#     if customer_data and (customer_data.get("name") or customer_data.get("phone")):
# 
#         customer = Customer.objects.create(
#             tenant=tenant,
#             name=customer_data.get("name", ""),
#             phone=customer_data.get("phone", ""),
#             notes=customer_data.get("notes", ""),
#         )
# 
#     order = Order.objects.create(
#         tenant=tenant, branch=branch, table=table, table_session=None,
#         customer=customer, order_type=order_type, status="PENDING",
#         idempotency_key=idempotency_key, subtotal=0, total=0, notes=notes,
#     )
# 
#     subtotal = _build_order_items(order=order, branch=branch, items=items)
# 
#     order.subtotal = subtotal
#     order.total = subtotal - order.discount
#     order.save(update_fields=["subtotal", "total", "updated_at"])
# 
#     transaction.on_commit(
#         lambda: dispatch_order_event(
#             tenant_id=tenant.id, event_type="ORDER_CREATED",
#             order_data=_serialize_order_for_event(order),
#         )
#     )
#     return order
# 
# 
# def _assert_transition(order: Order, target_status: str):
#     allowed = ALLOWED_TRANSITIONS.get(order.status, set())
#     if target_status not in allowed:
#         raise InvalidStateTransition(
#             f"نمی‌توان سفارش را از وضعیت {order.status} به {target_status} تغییر داد."
#         )
# 
# 
# def _transition_and_notify(order: Order, target_status: str, event_type: str) -> Order:
#     _assert_transition(order, target_status)
#     order.status = target_status
#     order.save(update_fields=["status", "updated_at"])
# 
#     transaction.on_commit(
#         lambda: dispatch_order_event(
#             tenant_id=order.tenant_id, event_type=event_type,
#             order_data=_serialize_order_for_event(order),
#         )
#     )
#     return order
# 
# 
# # @transaction.atomic
# # def confirm_order(order: Order) -> Order:
# #     _assert_transition(order, "CONFIRMED")
# #     order.status = "CONFIRMED"
# #     order.save(update_fields=["status", "updated_at"])
# #     return order
# 
# @transaction.atomic
# def confirm_order(order: Order) -> Order:
#     return _transition_and_notify(order, target_status="CONFIRMED", event_type="ORDER_UPDATED")
# 
# @transaction.atomic
# def complete_order(order: Order) -> Order:
#     return _transition_and_notify(order, target_status="COMPLETED", event_type="ORDER_UPDATED")
# 
# @transaction.atomic
# def cancel_order(order: Order) -> Order:
#     return _transition_and_notify(order, target_status="CANCELLED", event_type="ORDER_CANCELLED")
# 
# 
# # @transaction.atomic
# # def complete_order(order: Order) -> Order:
# #     _assert_transition(order, "COMPLETED")
# #     order.status = "COMPLETED"
# #     order.save(update_fields=["status", "updated_at"])
# #     return order
# # 
# # 
# # @transaction.atomic
# # def cancel_order(order: Order) -> Order:
# #     _assert_transition(order, "CANCELLED")
# #     order.status = "CANCELLED"
# #     order.save(update_fields=["status", "updated_at"])
# #     return order

from django.db import transaction
from apps.realtime.events import dispatch_order_event
from .exceptions import InvalidStateTransition, InvalidTable, ProductNotAvailable
from .models import Order, OrderItem

ALLOWED_TRANSITIONS = {
    "PENDING": {"CONFIRMED", "CANCELLED"},
    "CONFIRMED": {"COMPLETED", "CANCELLED"},
    "COMPLETED": set(),
    "CANCELLED": set(),
}


def _serialize_order_for_event(order: Order) -> dict:
    return {
        "id": str(order.id),
        "status": order.status,
        "table_id": str(order.table_id) if order.table_id else None,
        "total": str(order.total),
        "created_at": order.created_at.isoformat(),
    }


def _build_order_items(*, order: Order, branch, items: list[dict]) -> int:
    from apps.products.models import Product

    if not items:
        raise ProductNotAvailable("سفارش باید حداقل یک آیتم داشته باشد.")

    subtotal = 0
    order_items = []
    for item in items:
        product = Product.objects.select_for_update().filter(id=item["product_id"]).first()
        if not product:
            raise ProductNotAvailable(f"محصولی با شناسه {item['product_id']} پیدا نشد.")
        if product.category.menu.branch_id != branch.id:
            raise ProductNotAvailable(f"محصول «{product.name}» متعلق به این شعبه نیست.")
        if not product.is_available:
            raise ProductNotAvailable(f"محصول «{product.name}» در حال حاضر موجود نیست.")

        quantity = int(item["quantity"])
        if quantity < 1:
            raise ProductNotAvailable("تعداد باید حداقل ۱ باشد.")

        line_total = product.price * quantity
        subtotal += line_total

        order_items.append(OrderItem(
            order=order, product=product, product_name=product.name,
            unit_price=product.price, quantity=quantity, total_price=line_total,
        ))

    OrderItem.objects.bulk_create(order_items)
    return subtotal


@transaction.atomic
def create_dine_in_order(*, tenant, branch, table, items: list[dict],
                          idempotency_key: str, customer_data: dict | None = None, notes: str = ""):
    existing = Order.objects.select_for_update().filter(
        tenant=tenant, idempotency_key=idempotency_key
    ).first()
    if existing:
        return existing

    if table.branch_id != branch.id or table.branch.tenant_id != tenant.id:
        raise InvalidTable("این میز متعلق به این شعبه/رستوران نیست.")
    if not table.is_active:
        raise InvalidTable("این میز در حال حاضر فعال نیست.")

    customer = None
    if customer_data and (customer_data.get("name") or customer_data.get("phone")):
        from apps.customers.models import Customer

        customer = Customer.objects.create(
            tenant=tenant,
            name=customer_data.get("name", ""),
            phone=customer_data.get("phone", ""),
            notes=customer_data.get("notes", ""),
        )

    order = Order.objects.create(
        tenant=tenant, branch=branch, table=table, table_session=None,
        customer=customer, order_type="DINE_IN", status="PENDING",
        idempotency_key=idempotency_key, subtotal=0, total=0, notes=notes,
    )

    subtotal = _build_order_items(order=order, branch=branch, items=items)

    order.subtotal = subtotal
    order.total = subtotal - order.discount
    order.save(update_fields=["subtotal", "total", "updated_at"])

    transaction.on_commit(
        lambda: dispatch_order_event(
            tenant_id=tenant.id, event_type="ORDER_CREATED",
            order_data=_serialize_order_for_event(order),
        )
    )
    return order


@transaction.atomic
def create_manual_order(*, tenant, branch, order_type: str, items: list[dict],
                         idempotency_key: str | None = None, table=None,
                         customer_data: dict | None = None, notes: str = "",
                         created_by_membership=None):
    
    if order_type not in ("DINE_IN", "TAKEAWAY"):
        raise ProductNotAvailable("نوع سفارش نامعتبر است. فقط DINE_IN یا TAKEAWAY در دسترس است.")

    if order_type == "TAKEAWAY" and table is not None:
        raise ProductNotAvailable("سفارش بیرون‌بر نباید به میز وصل باشد.")

    if table is not None and table.branch_id != branch.id:
        raise ProductNotAvailable("این میز متعلق به این شعبه نیست.")

    if idempotency_key:
        existing = Order.objects.select_for_update().filter(
            tenant=tenant, idempotency_key=idempotency_key
        ).first()
        if existing:
            return existing
    else:
        import uuid
        idempotency_key = f"manual-{uuid.uuid4()}"

    customer = None
    if customer_data and (customer_data.get("name") or customer_data.get("phone")):
        from apps.customers.models import Customer

        customer = Customer.objects.create(
            tenant=tenant,
            name=customer_data.get("name", ""),
            phone=customer_data.get("phone", ""),
            notes=customer_data.get("notes", ""),
        )

    order = Order.objects.create(
        tenant=tenant, branch=branch, table=table, table_session=None,
        customer=customer, order_type=order_type, status="PENDING",
        idempotency_key=idempotency_key, subtotal=0, total=0, notes=notes,
    )

    subtotal = _build_order_items(order=order, branch=branch, items=items)

    order.subtotal = subtotal
    order.total = subtotal - order.discount
    order.save(update_fields=["subtotal", "total", "updated_at"])

    transaction.on_commit(
        lambda: dispatch_order_event(
            tenant_id=tenant.id, event_type="ORDER_CREATED",
            order_data=_serialize_order_for_event(order),
        )
    )
    return order


def _assert_transition(order: Order, target_status: str):
    allowed = ALLOWED_TRANSITIONS.get(order.status, set())
    if target_status not in allowed:
        raise InvalidStateTransition(
            f"نمی‌توان سفارش را از وضعیت {order.status} به {target_status} تغییر داد."
        )


def _transition_and_notify(order: Order, target_status: str, event_type: str) -> Order:
    _assert_transition(order, target_status)
    order.status = target_status
    order.save(update_fields=["status", "updated_at"])

    transaction.on_commit(
        lambda: dispatch_order_event(
            tenant_id=order.tenant_id, event_type=event_type,
            order_data=_serialize_order_for_event(order),
        )
    )
    return order


@transaction.atomic
def confirm_order(order: Order) -> Order:
    return _transition_and_notify(order, "CONFIRMED", "ORDER_UPDATED")


@transaction.atomic
def complete_order(order: Order) -> Order:
    return _transition_and_notify(order, "COMPLETED", "ORDER_UPDATED")


@transaction.atomic
def cancel_order(order: Order) -> Order:
    return _transition_and_notify(order, "CANCELLED", "ORDER_CANCELLED")