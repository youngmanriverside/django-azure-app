# Generated by Django 4.2.13 on 2024-06-25 03:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employer', '0002_plan_employer'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='plan_employer',
            new_name='plan_employer_detail',
        ),
    ]
