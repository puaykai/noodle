# -*- coding: utf-8 -*-
# Generated by Django 1.10a1 on 2016-07-11 15:49
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tuition', '0002_auto_20160627_2304'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='assignments',
        ),
        migrations.RemoveField(
            model_name='tutor',
            name='assignments',
        ),
    ]