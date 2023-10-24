from rest_framework.permissions import (
    AllowAny,
    BasePermission,
    SAFE_METHODS,
)
from rest_framework.views import Response
from rest_framework import status
from main.models import *
from main.serializers import *
from main.abstract.viewsets import AbstractViewSet


class IsOwnerOrReadOnlyBlog(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class UserPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous or request.method in SAFE_METHODS:
            return request.method in SAFE_METHODS
        if view.basename in ["post", "put"]:
            return bool(request.user and request.user.is_authenticated)
        return False

    def has_permission(self, request, view):
        if view.basename in ["post"]:
            if request.user.is_anonymous:
                return request.method in SAFE_METHODS
            return bool(request.user and request.user.is_authenticated)
        return False


class UserViewSet(AbstractViewSet):
    http_method_names = ("put", "get")
    permission_classes = (UserPermission,)
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
    http_method_names = ("post", "put", "get", "delete")
    permission_classes = (IsOwnerOrReadOnlyBlog,)
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
