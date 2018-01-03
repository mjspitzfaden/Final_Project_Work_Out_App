
# Create your models here.
from django.db import models
from django.conf import settings
# Create your models here.

class WorkOutDataForm(models.Model):
    userName = models.ForeignKey('UserDataForm', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    key = models.SlugField(max_length=50, unique=True, primary_key=True)
    exersise = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=False)
    weight = models.IntegerField(null=True)
    reps = models.IntegerField(null=True)
    distance = models.IntegerField(null=True)
    time = models.IntegerField(null=True)
    clicked = models.BooleanField(default=True)
    def __str__ (self):
        return self.name

class UserDataForm(models.Model):
    userName_id = models.CharField(max_length=50, unique=True, primary_key=True)
    Name = models.CharField(max_length=50)
    BMI = models.IntegerField(null=True)
    bloodPressure = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)
    waist = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True)
    email = models.CharField(max_length=50)
    def __str__ (self):
        return self.name
