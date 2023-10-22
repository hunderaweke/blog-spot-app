from rest_framework import serializers
from main.models import *
from main.abstract.serializers import AbstractSerializer
from main.abstract.serializers import *


class UserSerializer(AbstractSerializer):
    id = serializers.UUIDField(source="public_id", read_only=True, format="hex")
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "created",
            "updated",
            "username",
        ]


class BlogSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="public_id"
    )

    def validate_author(self, value):
        if self.context["request"].user != value:
            raise ValueError("You cannot create a blog for another user.")
        return value

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = User.objects.get_object_by_public_id(rep["author"])
        rep["author"] = UserSerializer(author).data
        return rep

    class Meta:
        model = Blog
        fields = ["id", "author", "body", "created", "edited"]
        read_only_fields = ["created", "edited"]
