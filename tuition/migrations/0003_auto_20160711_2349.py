# -*- coding: utf-8 -*-
# Generated by Django 1.10a1 on 2016-07-11 15:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tuition', '0002_auto_20160711_2349'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='assignments',
            field=models.ManyToManyField(related_name='student_assignments', through='tuition.StudentAssignment', to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='tutor',
            name='assignments',
            field=models.ManyToManyField(related_name='tutor_assignments', through='tuition.TutorAssignment', to='tuition.Assignment'),
        ),
    ]
