from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers_platform import OnboardTenantSerializer
from .services import onboard_new_tenant


class OnboardTenantView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        serializer = OnboardTenantSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = onboard_new_tenant(**serializer.validated_data)

        return Response(
            {
                "tenant_id": str(result["tenant"].id),
                "tenant_slug": result["tenant"].slug,
                "user_id": str(result["user"].id),
                "phone_number": result["user"].phone_number,
                "temporary_password": result["temporary_password"],
            },
            status=status.HTTP_201_CREATED,
        )