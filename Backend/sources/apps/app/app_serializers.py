from rest_framework import serializers
from . import models

from django.db.models import Sum
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
    created = serializers.ReadOnlyField()
    roomID = serializers.ReadOnlyField()
    status = serializers.ReadOnlyField()
    client = ClientSerializer(read_only = True)
    messages = MessageSerializer(read_only = True, many=True)


    class Meta:
        model = models.Chat
        fields = ["created", "roomID", "status", "client", "messages"]


class RegisterRetrieveSerializer(serializers.ModelSerializer):
    total_visits = serializers.SerializerMethodField()
    class Meta:
        model = models.Register
        fields = ["date", "visited", "total_visits"]

    def get_total_visits(self, obj):

        return models.Register.objects.all().aggregate(total=Sum("visited"))["total"]
    
class RegisterCreateSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = models.Register
        fields = ["date", "visited"]

