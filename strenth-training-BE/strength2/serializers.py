from rest_framework import serializers

from strength2.models import WorkOutDataForm

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOutDataForm
        fields = '__all__'
