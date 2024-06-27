from django.db import models
from apps.core.models import BaseModel
from uuid import uuid4
from .enums import ChatStatus
# Create your models here.
#chat 1----* messages 
#cliente 1 --- 1 chat

class Chat(BaseModel):
    #Fields
    roomID = models.UUIDField(primary_key=True, unique=True, editable=False, default=uuid4)
    status = models.CharField(max_length=5, default=ChatStatus.Request)
    #Relationships
    #Metadata
    #Methods

class Message(BaseModel):
    #Fields
    user_type = models.CharField(max_length=6)
    text = models.CharField(max_length=500)
    #Relationships
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    #Metadata
    #Methods


class Client(models.Model):
    #Fields
    name = models.CharField(max_length=32, blank=True)
    cellphone = models.PositiveIntegerField(blank=True)
    #Relationships
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='client')
    #Metadata
    #Methods

