from rest_framework import serializers

from strength2.models import WorkOutDataForm
from strength2.models import UserDataForm

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOutDataForm
        fields = '__all__'

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDataForm
        fields = '__all__'
