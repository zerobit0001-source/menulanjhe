from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        scope["user"] = None
        scope["tenant"] = None

        query_string = scope.get("query_string", b"").decode()
        token = parse_qs(query_string).get("token", [None])[0]

        if token:
            user, tenant = await self._authenticate(token)
            scope["user"] = user
            scope["tenant"] = tenant

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def _authenticate(self, raw_token):
        try:
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(raw_token)
            user = jwt_auth.get_user(validated_token)

            active_tenant_id = validated_token.get("active_tenant_id")
            if not active_tenant_id:
                return user, None

            from apps.tenants.models import Membership

            membership = Membership.objects.select_related("tenant").filter(
                user=user, tenant_id=active_tenant_id, is_active=True, tenant__is_active=True
            ).first()
            tenant = membership.tenant if membership else None
            return user, tenant
        except (InvalidToken, TokenError, Exception):
            return None, None