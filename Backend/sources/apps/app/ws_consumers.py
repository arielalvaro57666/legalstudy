import json 
import uuid

from asgiref.sync import async_to_sync

from .enums import WSMessageType, WSUserType, WSMClientState
from .constants import WSRequestMessages
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):

    client_type: str

    client_data = {
        "name": None,
        "cellphone": None
    }
    # user_role: str = ""

    client_request_state = WSMClientState.NameReq

    # The conecction is made and the client will have 


    def generate_message(self, message_type: str, user_type: str, text: str):
        return json.dumps({"type": message_type, "message":{"from": user_type, "text": text}}, ensure_ascii=False)


    def check_request(self, data):
        
        if (self.client_request_state == WSMClientState.NameReq and self.client_data["name"] == None):
            

            if (data["text"] == ""):
                return True
            
            self.client_data["name"] = data["text"]

        if (self.client_request_state == WSMClientState.CellphoneReq and self.client_data["cellphone"] == None):
            

            if (data["text"] == "" or len(data["text"]) < 4):
                return True
            
            self.client_data["cellphone"] = data["text"]
            
        return False
    
    async def connect(self):

        id = self.scope['url_route']['kwargs']['room_uuid']
        self.room_group_name = id
        

        await self.channel_layer.group_add(self.room_group_name,self.channel_name)

        await self.accept()
        #TODO Check if it is a admin or a client
        # Verificar si el usuario está autenticado
        # if self.scope["user"].is_authenticated:
        #     user_role = 'admin'
        # else:
        #     user_role = 'cliente'
        # print("SE CONECTO\n")
        # await self.send(text_data=json.dumps({
        #     'message': f'You are connected as {user_role} to group {self.room_group_name}',
        #     'role': user_role,
        #     'group': self.room_group_name
        # }))
        await self.set_request()

    async def disconnect(self, code):
        print("hi ",self.room_group_name)
        #TODO Make chat save status close (if is a client)

    async def set_request(self, error = False):
        message = ""

        if (self.client_data["name"] == None):

            self.client_request_state = WSMClientState.NameReq
            
            message = WSRequestMessages.NAME if (not error) else WSRequestMessages.NAME_ERROR
            
        elif (self.client_data["cellphone"] == None):

            self.client_request_state = WSMClientState.CellphoneReq

            message = WSRequestMessages.CELLPHONE if (not error) else WSRequestMessages.CELLPHONE_ERROR

        else:

            self.client_request_state = WSMClientState.Done

            message = WSRequestMessages.DONE

        await self.send(text_data=self.generate_message(WSMessageType.Request ,WSUserType.Admin, message))


    async def receive(self, text_data):
       
        data = json.loads(text_data)

        print("------------ ",data)

        #if client and not Done => Send client message and Send Request NoRoom
        if(data["from"] == WSUserType.Client and self.client_request_state != WSMClientState.Done):
     
            await self.send(text_data=self.generate_message(WSMessageType.Chat ,data["from"], data["text"]))
            error = self.check_request(data)
            await self.set_request(error)
    
        else:
            #Room message
            await self.channel_layer.group_send(self.room_group_name, {"type": "chat_message", "message": data})


    async def chat_message(self, event):
        message = self.generate_message(WSMessageType.Chat, event["message"]["from"], event["message"]["text"])
        #message = {"type": "chat", "message": event["message"]}
        print(event["message"]["from"], event["message"]["text"])
        await self.send(text_data=message)
