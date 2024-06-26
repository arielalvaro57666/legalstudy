from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .controllers.execute import processCalculo
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
#Models
from . import models
from . import app_serializers
# Create your views here.
 
## Calculo Views
class Calculo(RetrieveAPIView):

    def post(self, request):
        try:
            print(request.data)

            data = processCalculo(request.data)
            
            return Response(data)   
        
        except Exception as exception:
            #Do logger class for this
            pass

## Chat Views
class Chat(ModelViewSet):
    lookup_field = "id"
    queryset = models.Chat.objects.all()
    serializer_class = app_serializers.ChatSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    #Mixin allow us to CRUD with the serializer 

