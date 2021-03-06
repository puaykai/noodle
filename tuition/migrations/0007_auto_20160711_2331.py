# -*- coding: utf-8 -*-
# Generated by Django 1.10a1 on 2016-07-11 15:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tuition', '0006_remove_student_assignments'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(choices=[('UN', 'uncompleted'), ('DO', 'done'), ('RE', 'ready')], default='UN', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='TutorAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(choices=[('DR', 'draft'), ('RE', 'ready'), ('GR', 'graded'), ('CA', 'cancelled')], default='RE', max_length=2)),
            ],
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='type',
        ),
        migrations.AlterField(
            model_name='tutor',
            name='assignments',
            field=models.ManyToManyField(related_name='tutor_assignments', through='tuition.TutorAssignment', to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='tutorassignment',
            name='assignment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='tutorassignment',
            name='tutor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tuition.Tutor'),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='assignment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tuition.Assignment'),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tuition.Student'),
        ),
        migrations.AddField(
            model_name='student',
            name='assignments',
            field=models.ManyToManyField(related_name='student_assignments', through='tuition.StudentAssignment', to='tuition.Assignment'),
        ),
    ]
