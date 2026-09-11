# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# 
# 
# class OrderConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         tenant = self.scope.get("tenant")
#         if tenant is None:
#             await self.close(code=4403)
#             return
# 
#         self.group_name = f"tenant_{tenant.id}_orders"
#         await self.channel_layer.group_add(self.group_name, self.channel_name)
#         await self.accept()
# 
#     async def disconnect(self, close_code):
#         if hasattr(self, "group_name"):
#             await self.channel_layer.group_discard(self.group_name, self.channel_name)
# 
#     async def order_event(self, event):
#         await self.send(text_data=json.dumps(event["payload"]))

import json

from channels.generic.websocket import AsyncWebsocketConsumer


class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        tenant = self.scope.get("tenant")
        if tenant is None:
            await self.close(code=4403)
            return

        self.group_name = f"tenant_{tenant.id}_orders"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def order_event(self, event):
        await self.send(text_data=json.dumps(event["payload"]))