# Generated by Django 5.0.4 on 2024-06-17 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createAt',
            field=models.DateTimeField(),
        ),
    ]