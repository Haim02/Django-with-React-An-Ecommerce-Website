# Generated by Django 5.0.4 on 2024-06-26 23:58

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_alter_order_createat'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='createAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
