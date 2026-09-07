from rest_framework import serializers
from .models import Branch


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "name", "slug", "address", "phone", "is_active", "is_default", "created_at"]
        read_only_fields = ["id", "is_default", "created_at"]