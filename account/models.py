from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    cellphone = models.CharField(blank=True, null=True, default="", max_length=32)
    created = models.DateTimeField(auto_now_add=True)
    friends = models.ManyToManyField("self", blank=True, null=True)
