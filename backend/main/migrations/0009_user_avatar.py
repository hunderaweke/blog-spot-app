# Generated by Django 4.2.6 on 2023-10-24 14:02

from django.db import migrations, models
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_blog_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, upload_to=main.models.upload_to),
        ),
    ]