# Generated by Django 4.2.6 on 2023-10-24 13:59

from django.db import migrations, models
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_blog_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='photo',
            field=models.ImageField(blank=True, upload_to=main.models.upload_to),
        ),
    ]
