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
    

class ChatAdminRetrieveSerializer(ChatRetrieveSerializer):

    class Meta:
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Message
        fields = ["text", "chat"]

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Client
        fields = ["name", "cellphone", "chat"]