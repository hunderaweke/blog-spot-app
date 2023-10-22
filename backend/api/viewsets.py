from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status
from main.models import *
from main.serializers import *
from main.abstract.viewsets import AbstractViewSet
from django.http import HttpRequest


class UserViewSet(AbstractViewSet):
    http_method_names = ("patch", "get")
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)

    def get_object(self):
        obj = User.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class BlogViewSet(AbstractViewSet):
    http_method_names = ("post", "patch", "get")
    permission_classes = (AllowAny,)
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.all()

    def get_object(self):
        obj = Blog.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
