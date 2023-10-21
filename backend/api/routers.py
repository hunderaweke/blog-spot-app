from rest_framework import routers

from .viewsets import UserViewSet
from main.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet

router = routers.SimpleRouter()

router.register(r"user", UserViewSet, basename="user")
router.register(r"auth/register", RegisterViewSet, basename="auth-register")
router.register(r"auth/login", LoginViewSet, basename="auth-login")
router.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")
urlpatterns = [
    *router.urls,
]
