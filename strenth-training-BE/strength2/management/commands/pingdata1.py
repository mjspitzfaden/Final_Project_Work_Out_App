from django.core.management.base import BaseCommand, CommandError
from strength2.models import WorkOutDataForm
from strength2.serializers import WorkoutSerializer
from rest_framework.response import Response

from strength2.models import WorkOutDataForm
import paho.mqtt.client as paho
import os
import socket
import ssl
import json
import datetime

def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc) )
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("myTopic" , 1 )

def on_message(client, userdata, msg):
    print("topic: "+msg.topic)
    print("payload: "+str(msg.payload))

    jsonData = msg.payload
    jsonToPython = json.loads(jsonData)
    print("payload: "+ str(jsonToPython['date']))
    dateTime = datetime.datetime.fromtimestamp(jsonToPython['date'])
    jsonToPython['date'] = dateTime
    contacts = [jsonToPython]
    for c in contacts:
        instance = WorkOutDataForm.objects.filter(key=c['key']).first()

        serializer = WorkoutSerializer(data=c, instance=instance)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    return Response({'status': 'OK'})



class Command(BaseCommand):
    help = 'Subscribe to thing data'



    #def on_log(client, userdata, level, msg):
    #    print(msg.topic+" "+str(msg.payload))
    def handle(self, *args, **options):
        mqttc = paho.Client()
        mqttc.on_connect = on_connect
        mqttc.on_message = on_message
        #mqttc.on_log = on_log

        awshost = "a3syr9zb6r0bcy.iot.us-east-1.amazonaws.com"
        awsport = 8883
        clientId = "WorkOutData"
        thingName = "WorkOutData"
        caPath = "strength2/management/commands/root-CA.crt"
        certPath = "strength2/management/commands/WorkoutData.cert.pem"
        keyPath = "strength2/management/commands/WorkoutData.private.key"

        mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)

        mqttc.connect(awshost, awsport, keepalive=60)


        mqttc.loop_forever()
