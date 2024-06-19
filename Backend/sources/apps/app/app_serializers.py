from rest_framework import serializers
from . import models

# class ClientSerializer(serializers.ModelSerializer)

# class MessageSerializer(serializers.ModelSerializer)

class ChatSerializer(serializers.ModelSerializer):


    class Meta:
        model = models.Chat
        fields = ["roomID", "status", "messages", "client"]
        depth = 1
