from rest_framework import serializers
from . import models

# class ClientSerializer(serializers.ModelSerializer)

# class MessageSerializer(serializers.ModelSerializer)

class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Message
        fields = ["text", "chatRoom"]

    

class ChatRetrieveSerializer(serializers.ModelSerializer):


    class Meta:
        model = models.Chat
        fields = ["roomID"]
        depth = 1




    #     