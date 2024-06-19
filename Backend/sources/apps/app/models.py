from django.db import models
from apps.core.models import BaseModel
# Create your models here.
#chat 1----* messages 
#cliente 1 --- 1 chat

class Chat(BaseModel):
    #Fields
    roomID = models.UUIDField(unique=True)
    status = models.CharField(max_length=5, default="open")

    #Relationships
    #Metadata
    #Methods

class Message(BaseModel):
    #Fields
    text = models.CharField(max_length=500)
    #Relationships
    chatRoom = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    #Metadata
    #Methods


class Client(models.Model):
    #Fields
    name = models.CharField(max_length=32)
    cellphone = models.PositiveIntegerField()
    #Relationships
    chatRoom = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='client')
    #Metadata
    #Methods

