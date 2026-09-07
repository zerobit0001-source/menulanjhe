from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.tenants.models import Membership
from .serializers import (
    ChangePasswordSerializer,
    MembershipSummarySerializer,
    SelectTenantSerializer,
    UserSerializer,
)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        memberships = Membership.objects.filter(user=request.user).select_related("tenant", "role")
        return Response(
            {
                "user": UserSerializer(request.user).data,
                "memberships": MembershipSummarySerializer(memberships, many=True).data,
            }
        )


class SelectTenantView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = SelectTenantSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        return Response(result, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)