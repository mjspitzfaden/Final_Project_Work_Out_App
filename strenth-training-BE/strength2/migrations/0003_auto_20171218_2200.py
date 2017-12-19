# Generated by Django 2.0 on 2017-12-18 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('strength2', '0002_auto_20171218_1806'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserDataForm',
            fields=[
                ('userName_id', models.CharField(max_length=50, primary_key=True, serialize=False, unique=True)),
                ('Name', models.CharField(max_length=50)),
                ('BMI', models.IntegerField(null=True)),
                ('bloodPressure', models.IntegerField(null=True)),
                ('weight', models.IntegerField(null=True)),
                ('waist', models.IntegerField(null=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('email', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='workoutdataform',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
