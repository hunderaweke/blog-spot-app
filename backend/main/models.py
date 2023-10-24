import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from main.abstract.models import AbstractManager, AbstractModel


def upload_to(instance, filename):
    return "images/{filename}".format(filename=filename)


class UserManager(BaseUserManager, AbstractManager):
    def get_object_by_public_id(self, public_id):
        try:
            instance = self.get(public_id=public_id)
            return instance
        except (ObjectDoesNotExist, ValueError, TypeError):
            return Http404

    def create_user(self, username, email, password=None, **kwargs):
        if username is None:
            raise TypeError("Users must have username.")
        if email is None:
            raise TypeError("Users must have email")
        if password is None:
            raise TypeError("Users must have a password")
        user = self.model(
            username=username, email=self.normalize_email(email), **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        if username is None:
            raise TypeError("Superusers must have username.")
        if email is None:
            raise TypeError("Superusers must have email")
        if password is None:
            raise TypeError("Superusers must have a password")
        user = self.model(username, email, **kwargs)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    public_id = models.UUIDField(
        db_index=True, unique=True, default=uuid.uuid4, editable=False
    )
    username = models.CharField(db_index=True, unique=True, max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to=upload_to, blank=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = UserManager()

    def __str__(self) -> str:
        return f"{self.email}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


class BlogManager(AbstractManager):
    pass


class Blog(AbstractModel):
    title = models.CharField(max_length=255)
    photo = models.ImageField(upload_to=upload_to, blank=True)
    body = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
    edited = models.BooleanField(default=False)
    objects = BlogManager()
    REQUIRED_FIELDS = ["body", "title", "photo"]

    def __str__(self):
        return self.author.name

    class Meta:
        db_table = "blog"
