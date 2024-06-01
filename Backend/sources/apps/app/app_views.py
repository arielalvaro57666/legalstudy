from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import action
from rest_framework.response import Response

from .controllers.execute import processCalculo
# Create your views here.


class Calculo(RetrieveAPIView):

    def post(self, request):
        
        print(request.data)

        data = processCalculo(request.data)
        
        return Response(data)




