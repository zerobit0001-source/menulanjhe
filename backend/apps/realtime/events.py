from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def dispatch_order_event(*, tenant_id, event_type: str, order_data: dict):
    channel_layer = get_channel_layer()
    if channel_layer is None:
        return

    group_name = f"tenant:{tenant_id}:orders"
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "order.event",
            "payload": {"event": event_type, "order": order_data},
        },
    )