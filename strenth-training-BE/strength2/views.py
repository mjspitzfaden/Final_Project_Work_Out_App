from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from strength2.models import WorkOutDataForm
from strength2.models import UserDataForm
from strength2.serializers import WorkoutSerializer
#from blog.serializers import PostSerializer
# Create your views here.

@api_view(['GET'])
#@permission_classes((IsAuthenticated, ))
def WorkOutData (request):
    data = WorkOutDataForm.objects.all()
    serializer = WorkoutSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
#@permission_classes((IsAuthenticated, ))
def WorkOutDataSave (request):
    contacts = request.data['contacts']
    for c in contacts:
        instance = WorkOutDataForm.objects.filter(key=c['key']).first()

        serializer = WorkoutSerializer(data=c, instance=instance)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    return Response({'status': 'OK'})

@api_view(['POST'])
def SaveUserData (request):
        c = request.data

        instance = UserDataForm.objects.filter(key=c['key']).first()

        serializer = WorkoutSerializer(data=c, instance=instance)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({'status': 'OK'})
