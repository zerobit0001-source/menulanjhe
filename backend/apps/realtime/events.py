# from asgiref.sync import async_to_sync
# from channels.layers import get_channel_layer
# 
# 
# def dispatch_order_event(*, tenant_id, event_type: str, order_data: dict):
#     channel_layer = get_channel_layer()
#     if channel_layer is None:
#         return
# 
#     group_name = f"tenant_{tenant_id}_orders"
#     async_to_sync(channel_layer.group_send)(
#         group_name,
#         {
#             "type": "order.event",
#             "payload": {"event": event_type, "order": order_data},
#         },
#     )

import logging

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

logger = logging.getLogger("apps.realtime")


def dispatch_order_event(*, tenant_id, event_type: str, order_data: dict):
    try:
        channel_layer = get_channel_layer()
        if channel_layer is None:
            return

        group_name = f"tenant_{tenant_id}_orders"
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "order.event",
                "payload": {"event": event_type, "order": order_data},
            },
        )
    except Exception:
        logger.exception("Failed to dispatch real-time order event (tenant_id=%s)", tenant_id)