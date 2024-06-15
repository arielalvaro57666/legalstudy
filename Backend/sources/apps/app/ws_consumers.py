import json 

from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'test'
        self.user = {
            'name': None,
            'age': None,
        }
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        await self.send_initial_message()

    async def send_initial_message(self):
        if not self.user['name']:
            await self.send(text_data=json.dumps({
                'type': 'chat',
                'message': 'Hola! ¿Cuál es tu nombre?'
            }))
        elif not self.user['age']:
            await self.send(text_data=json.dumps({
                'type': 'chat',
                'message': f'Hola {self.user["name"]}! ¿Cuántos años tienes?'
            }))
        else:
            await self.send(text_data=json.dumps({
                'type': 'chat',
                'message': f'Bienvenido {self.user["name"]}! Ya puedes empezar a chatear.'
            }))

    async def receive(self, text_data):
        message = text_data.strip()

        if not self.user['name']:
            self.user['name'] = message
            await self.send_initial_message()
        elif not self.user['age']:
            try:
                age = int(message)
                if age < 0:
                    raise ValueError('La edad debe ser un número positivo.')
                self.user['age'] = age
                await self.send_initial_message()
            except ValueError as e:
                await self.send(text_data=json.dumps({
                    'type': 'chat',
                    'message': str(e) + ' Por favor, ingresa una edad válida.'
                }))
        else:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat.message',
                    'message': message,
                    'user_name': self.user['name']
                }
            )

    async def chat_message(self, event):
        message = event['message']
        user_name = event['user_name']

        await self.send(text_data=json.dumps({
            'type': 'chat',
            'message': f'{user_name}: {message}'
        }))
