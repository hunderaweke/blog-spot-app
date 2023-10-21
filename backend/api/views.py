from rest_framework import views
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.decorators import api_view
from ..main.serializers import *
from main.models import *


@api_view(["GET"])
def get_blog_data(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_users_data(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def post_user_data(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
