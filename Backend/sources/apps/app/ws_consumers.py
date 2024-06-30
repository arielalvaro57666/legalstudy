import json 
import uuid
import re
from asgiref.sync import async_to_sync

from channels.layers import get_channel_layer
from .enums import WSType, WSUserType, WSMClientState, WSNotificationType, ChatStatus
from .constants import WSRequestMessages
import json
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from asgiref.sync import sync_to_async
from . import app_serializers
from . import models

from channels.db import database_sync_to_async

from channels.auth import AuthMiddlewareStack
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, app):
        self.app = app
    


    async def __call__(self, scope, receive, send):
   
        headers = dict(scope['headers'])

      
        if(headers.get(b"cookie")):

            token_name, token_key = headers[b"cookie"].decode("utf-8").split('=')
      
            if (token_name == "tkv1"):
                try:
                    token = await sync_to_async(Token.objects.get)(key=token_key)
                    scope["user"] = "Admin"
                    # scope['user'] = await sync_to_async(lambda: token.user)()
                except Token.DoesNotExist:
                    scope["user"] = "AnonymousUser"
        else:
            scope["user"] = "AnonymousUser"

        return await self.app(scope, receive, send)

def generate_message(ws_type: str, user_type: str, text: str):
    return json.dumps({"type": ws_type, "data":{"user_type": user_type, "text": text}}, ensure_ascii=False)

def generate_notification(ws_type:str , notification_type: int):
    return json.dumps({"type": ws_type, "data":{"notification_type":notification_type}}, ensure_ascii=False)



GROUP_DISPLAY = 'displays'
GROUP_PENDINGS = 'pendings'
GROUP_EMITTER = 'emitters'
GROUP_ADVERTISER = 'advertisers'

class AdminConsumer(WebsocketConsumer):

    def connect(self):

        # logger = logs.Logger("TurnConsumer")
        # logger.info("connect", line_and_date=True)

        # self.room_name = self.scope['url_route']['kwargs']['room_name']
        # self.group_name = self.GROUP_LAST_TURNS # 'chat_%s' % self.room_name
        
        self.group_name = GROUP_PENDINGS # 'chat_%s' % self.room_name        

        # Join room group
        async_to_sync(self.channel_layer.group_add)(self.group_name,self.channel_name)

        self.accept()


    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    # Receive message from WebSocket


    # Receive message from room group
    def receive_from_group(self, event):
        message = generate_notification(WSType.Admin, event["notification_type"])
        self.send(text_data=message)

    

class ChatConsumer(AsyncWebsocketConsumer):

    clientSerializer = app_serializers.ClientSerializer
    messageSerializer = app_serializers.MessageSerializer

    # The conecction is made and the client will have 
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        #Client
        self.client_request_state = WSMClientState.NameRequest
        self.client_data = {
            "name": None,
            "cellphone": None
        }
        self.chat_instance = None
    


    def check_request(self, data):
        
        if (self.client_request_state == WSMClientState.NameRequest and self.client_data["name"] == None):
            

            if (data["text"] == ""):
                return True
            
            self.client_data["name"] = data["text"]

        if (self.client_request_state == WSMClientState.CellphoneRequest and self.client_data["cellphone"] == None):
            

            if (not re.match(r'^\d+$', data["text"]) ):
                return True
            
            self.client_data["cellphone"] = data["text"]
            
        return False
    
    @database_sync_to_async
    def save_request(self):
        models.Client.objects.create(chat=self.chat_instance, **self.client_data)

    @database_sync_to_async
    def save_message(self, data):
        models.Message.objects.create(chat=self.chat_instance, user_type=self.scope["user"], **data)

    @database_sync_to_async
    def save_status(self, status):
        self.chat_instance.status = status
        self.chat_instance.save()

    @database_sync_to_async
    def remove_chat(self):
        self.chat_instance.delete()

    async def notifiy_changes(self):
        channel_layer = get_channel_layer()
        await channel_layer.group_send(
            GROUP_PENDINGS,
            {
                'type': 'receive_from_group',
                'notification_type': WSNotificationType.chatChanged
            }
        )

    async def connect(self):

        id = self.scope['url_route']['kwargs']['room_uuid']
        self.room_group_name = id

        self.chat_instance = await sync_to_async(models.Chat.objects.get)(roomID=self.room_group_name)

        await self.channel_layer.group_add(self.room_group_name,self.channel_name)

        await self.accept()

        if (self.scope["user"] == WSUserType.AnonymousUser):
            await self.set_request()

        
    async def websocket_disconnect(self, message):
        if(self.scope["user"] == WSUserType.AnonymousUser):
            await self.save_status(ChatStatus.Closed)
         
        
        if(self.client_request_state != WSMClientState.Done):
            await self.remove_chat()

        await self.notifiy_changes()

        return super().websocket_disconnect(message)
        


    async def set_request(self, error = False):
        message = ""

        if (self.client_data["name"] == None):

            self.client_request_state = WSMClientState.NameRequest
            
            message = WSRequestMessages.NAME if (not error) else WSRequestMessages.NAME_ERROR
            
        elif (self.client_data["cellphone"] == None):

            self.client_request_state = WSMClientState.CellphoneRequest

            message = WSRequestMessages.CELLPHONE if (not error) else WSRequestMessages.CELLPHONE_ERROR

        else:
            await self.save_request()
            
            await self.save_status(ChatStatus.Open)
            await self.notifiy_changes()

            self.client_request_state = WSMClientState.Done

            message = WSRequestMessages.DONE
            

        await self.send(text_data=generate_message(WSType.Chat ,WSUserType.Admin, message))


    async def receive(self, text_data):
       
        data = json.loads(text_data)

        #if client and not Done => Send client message and Send Request NoRoom
        if( self.scope["user"] == WSUserType.AnonymousUser and self.client_request_state != WSMClientState.Done):
     
            await self.send(text_data=generate_message(WSType.Chat, self.scope["user"], data["text"]))
            error = self.check_request(data)
            await self.set_request(error)
        
        else:
            #Room message
            
            await self.save_message(data)
            data["user_type"] = self.scope["user"]
            await self.channel_layer.group_send(self.room_group_name, {"type": "chat_message", "message": data})


    async def chat_message(self, event):
        message = generate_message(WSType.Chat, event["message"]["user_type"], event["message"]["text"])
    
        await self.send(text_data=message)


def notify_changes():

    channel_layer = get_channel_layer()

    # Send message to room group
    async_to_sync(channel_layer.group_send)(
        GROUP_PENDINGS,
        {
            'type': 'receive_from_group',
            'notification_type': WSNotificationType.chatChanged
        }
    )