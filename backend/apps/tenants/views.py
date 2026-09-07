from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SelectTenantSerializer


class SelectTenantView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = SelectTenantSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        return Response(result, status=status.HTTP_200_OK)