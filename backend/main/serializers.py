from rest_framework import serializers
from main.models import *


class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source="public_id", read_only=True, format="hex")
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "created", "updated"]


class BlogSerializer(serializers.ModelSerializer):
    created = serializers.ReadOnlyField()
    author = serializers.ReadOnlyField()

    class Meta:
        model = Blog
        fields = "__all__"
