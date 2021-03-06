# -*- coding: utf-8 -*-
# Generated by Django 1.10a1 on 2016-06-27 15:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tuition', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
        migrations.RemoveField(
            model_name='tutor',
            name='questions',
        ),
        migrations.AddField(
            model_name='question',
            name='maximum_grade',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='tutor',
            name='students',
            field=models.ManyToManyField(related_name='students', to='tuition.Student'),
        ),
        migrations.AddField(
            model_name='assignment',
            name='questions',
            field=models.ManyToManyField(related_name='questions', to='tuition.Question'),
        ),
        migrations.AddField(
            model_name='student',
            name='completed_assignments',
            field=models.ManyToManyField(related_name='completed_assignments', to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='student',
            name='due_assignments',
            field=models.ManyToManyField(related_name='due_assignments', to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='tutor',
            name='assignments',
            field=models.ManyToManyField(related_name='assignments', to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='tutor',
            name='draft_assignments',
            field=models.ManyToManyField(related_name='draft_assignments', to='tuition.Assignment'),
        ),
    ]
