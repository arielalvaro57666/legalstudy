from rest_framework import serializers
from . import models

# class ClientSerializer(serializers.ModelSerializer)

# class MessageSerializer(serializers.ModelSerializer)

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Message
        fields = ["user_type", "text"]

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Client
        fields = ["name", "cellphone"]

class ChatSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only = True)
    messages = MessageSerializer(read_only = True, many=True)

    class Meta:
        model = models.Chat
        fields = ["created", "roomID", "status", "client", "messages"]

    
