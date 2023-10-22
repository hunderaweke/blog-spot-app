from rest_framework import routers

from .viewsets import *
from main.auth.viewsets import *

router = routers.SimpleRouter()

router.register(r"user", UserViewSet, basename="user")
router.register(r"auth/register", RegisterViewSet, basename="auth-register")
router.register(r"auth/login", LoginViewSet, basename="auth-login")
router.register(r"auth/refresh", RefreshViewSet, basename="auth-refresh")
router.register(r"blog", BlogViewSet, basename="blog")
urlpatterns = [
    *router.urls,
]
