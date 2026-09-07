import uuid
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra):
        user = self.model(phone_number=phone_number, **extra)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, phone_number, password=None, **extra):
        extra["is_staff"] = True
        extra["is_superuser"] = True
        return self.create_user(phone_number, password, **extra)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()
    USERNAME_FIELD = "phone_number"