from rest_framework import serializers

from main.models import User
from main.serializers import UserSerializer


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
