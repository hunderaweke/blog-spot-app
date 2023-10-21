from django.urls import path
from . import views

urlpatterns = [
    path("api/blogs", views.get_blog_data),
    path("api/users", views.get_users_data),
    path("api/user/post", views.post_user_data),
]
