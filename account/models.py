from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.core import serializers
from json import loads


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(blank=True, null=True)
    cellphone = models.CharField(blank=True, null=True, default="", max_length=32)
    email_address = models.EmailField(blank=True, null=True)
    cellphone_verified = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    friends = models.ManyToManyField("self", blank=True)

    @classmethod
    def get_profile(cls, user):
        list_of_user_profiles = loads(serializers.serialize("json", UserProfile.objects.filter(user=user)))
        if len(list_of_user_profiles) > 0:
            return list_of_user_profiles[0]
        else:
            return None

    @classmethod
    def get_all_profiles(cls):
        return loads(serializers.serialize("json", UserProfile.objects.all()))
