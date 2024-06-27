import json 
import uuid

from asgiref.sync import async_to_sync

from .enums import WSMessageType, WSUserType, WSMClientState, ChatStatus
from .constants import WSRequestMessages
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from . import app_serializers
from . import models

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

        print(headers, flush=True)
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
        

    def generate_message(self, message_type: str, user_type: str, text: str):
        return json.dumps({"type": message_type, "message":{"user_type": user_type, "text": text}}, ensure_ascii=False)


    def check_request(self, data):
        
        if (self.client_request_state == WSMClientState.NameRequest and self.client_data["name"] == None):
            

            if (data["text"] == ""):
                return True
            
            self.client_data["name"] = data["text"]

        if (self.client_request_state == WSMClientState.CellphoneRequest and self.client_data["cellphone"] == None):
            

            if (data["text"] == "" or len(data["text"]) < 4):
                return True
            
            self.client_data["cellphone"] = data["text"]
            
        return False
    
    async def save_request(self):
        await sync_to_async(models.Client.objects.create)(chat=self.chat_instance, **self.client_data)

    async def save_message(self, data):
        await sync_to_async(models.Message.objects.create)(chat=self.chat_instance, **data)

    async def save_status(self, status):
        self.chat_instance.status = status
        await sync_to_async(self.chat_instance.save)()

    async def connect(self):

        id = self.scope['url_route']['kwargs']['room_uuid']
        self.room_group_name = id
        self.chat_instance = await sync_to_async(models.Chat.objects.get)(roomID=self.room_group_name)
        await self.channel_layer.group_add(self.room_group_name,self.channel_name)


        await self.accept()
        #TODO Check if it is a admin or a client
        # Verificar si el usuario está autenticado

        # }))
        await self.set_request()

    async def disconnect(self, code):
        print("hi ",self.room_group_name)
        #TODO Make chat save status close (if is a client)
        
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

            self.client_request_state = WSMClientState.Done

            message = WSRequestMessages.DONE
            

        await self.send(text_data=self.generate_message(WSMessageType.Request ,WSUserType.Admin, message))


    async def receive(self, text_data):
       
        data = json.loads(text_data)

        print("------------ ",data)

        #if client and not Done => Send client message and Send Request NoRoom
        if( self.scope["user"] == WSUserType.AnonymousUser and self.client_request_state != WSMClientState.Done):
     
            await self.send(text_data=self.generate_message(WSMessageType.Chat, self.scope["user"], data["text"]))
            error = self.check_request(data)
            await self.set_request(error)
        
        else:
            #Room message
            
            await self.save_message(data)
            await self.channel_layer.group_send(self.room_group_name, {"type": "chat_message", "message": data})


    async def chat_message(self, event):
        message = self.generate_message(WSMessageType.Chat, self.scope["user"], event["message"]["text"])
        #message = {"type": "chat", "message": event["message"]}

        await self.send(text_data=message)
