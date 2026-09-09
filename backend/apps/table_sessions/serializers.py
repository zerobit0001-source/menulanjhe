from rest_framework import serializers
from .models import TableSession


class TableSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableSession
        fields = ["id", "table", "status", "session_token", "created_at"]
        read_only_fields = fields