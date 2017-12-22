from django.core.management.base import BaseCommand, CommandError

from strength2.models import WorkOutDataForm
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient, AWSIoTMQTTShadowClient
import logging
import time
import argparse
import json

AllowedActions = ['both', 'publish', 'subscribe']

    # Custom MQTT message callback
def customCallback(*args, **kw):
    print(args, kw)
    try:
        print("Received a new message: ")
        print(message.payload)
        print("from topic: ")
        print(message.topic)
        print("--------------\n\n")
    except:
        print('I FAILED')


class Command(BaseCommand):
    help = 'Subscribe to thing data'

    def add_arguments(self, parser):
        parser.add_argument("-e", "--endpoint", action="store", dest="host", default="a3syr9zb6r0bcy.iot.us-east-1.amazonaws.com", help="default: a3syr9zb6r0bcy.iot.us-east-1.amazonaws.com")
        parser.add_argument("-r", "--rootCA", action="store", dest="rootCAPath", default="strength2/management/commands/root-CA.crt", help="root-CA.crt")
        parser.add_argument("-c", "--cert", action="store", dest="certificatePath", default="strength2/management/commands/WorkoutData.cert.pem", help="WorkoutData.cert.pem")
        parser.add_argument("-k", "--key", action="store", dest="privateKeyPath", default="strength2/management/commands/WorkoutData.private.key", help="WorkoutData.private.key")
        parser.add_argument("-w", "--websocket", action="store_true", dest="useWebsocket", default=False,
                            help="Use MQTT over WebSocket")
        parser.add_argument("-id", "--clientId", action="store", dest="clientId", default="WorkoutData",
                            help="Targeted client id")
        parser.add_argument("-t", "--topic", action="store", dest="topic", default="myTopic", help="Targeted topic")
        parser.add_argument("-m", "--mode", action="store", dest="mode", default="both",
                            help="Operation modes: %s"%str(AllowedActions))
        parser.add_argument("-M", "--message", action="store", dest="message", default="Hello World!",
                            help="Message to publish")


    # def add_arguments(self, parser):
    #     parser.add_argument('poll_id', nargs='+', type=int)

    def handle(self, *args, **options):
        host = options['host']
        rootCAPath = options['rootCAPath']
        certificatePath = options['certificatePath']
        privateKeyPath = options['privateKeyPath']
        useWebsocket = options['useWebsocket']
        clientId = options['clientId']
        topic = options['topic']
        print(topic)

        if options['mode'] not in AllowedActions:
            parser.error("Unknown --mode option %s. Must be one of %s" % (args.mode, str(AllowedActions)))
            exit(2)

        if options['useWebsocket'] and options['certificatePath'] and options['privateKeyPath']:
            parser.error("X.509 cert authentication and WebSocket are mutual exclusive. Please pick one.")
            exit(2)

        if not options['useWebsocket'] and (not options['certificatePath'] or not options['privateKeyPath']):
            parser.error("Missing credentials for authentication.")
            exit(2)

        # Configure logging
        logger = logging.getLogger("AWSIoTPythonSDK.core")
        logger.setLevel(logging.DEBUG)
        streamHandler = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        streamHandler.setFormatter(formatter)
        logger.addHandler(streamHandler)

        # Init AWSIoTMQTTClient
        myAWSIoTMQTTClient = None
        if useWebsocket:
            myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId, useWebsocket=True)
            myAWSIoTMQTTClient.configureEndpoint(host, 443)
            myAWSIoTMQTTClient.configureCredentials(rootCAPath)
        else:
            myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
            #myAWSIoTMQTTClient = AWSIoTMQTTShadowClient(clientId)
            myAWSIoTMQTTClient.configureEndpoint(host, 8883)
            myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

        # AWSIoTMQTTClient connection configuration
        myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
        myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
        myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
        myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
        myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

        # Connect and subscribe to AWS IoT
        myAWSIoTMQTTClient.connect()
        #if options['mode'] == 'both' or options['mode'] == 'subscribe':
        myAWSIoTMQTTClient.subscribe(topic, 1, customCallback)
        #myDeviceShadow = myAWSIoTMQTTClient.createShadowHandlerWithName("Bot", True)
        time.sleep(2)

        # Publish to the same topic in a loop forever
        loopCount = 0
        while True:
            print('loop')
            #myDeviceShadow.shadowGet(customCallback, 5)
            # if options['mode'] == 'both' or options['mode'] == 'publish':
            #     message = {}
            #     message['message'] = options['message']
            #     message['sequence'] = loopCount
            #     #messageJson = json.dumps(message)
            #     #myAWSIoTMQTTClient.publish(topic, messageJson, 1)
            #     #if options['mode'] == 'publish':
            #     #    print('Published topic %s: %s\n' % (topic, messageJson))
            #     loopCount += 1
            time.sleep(10)
