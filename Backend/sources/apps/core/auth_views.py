
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
class AuthViewSet(GenericViewSet):
    pass

    @action(methods=["POST"], detail=False, permission_classes = [AllowAny])
    def login(self, request):
        try:
                
            user = get_object_or_404(User, username = request.data["username"])

            if not user.check_password(request.data["password"]):
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
            
            token, created = Token.objects.get_or_create(user=user)

            serializer = serializers.UserSerializer(instance=user)
            print(token)
            return Response({"token": token.key, "user": serializer.data})
    
        except Exception as e:
            print(e)
            return Response({"detail": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["POST"], detail=False, permission_classes = [AllowAny])
    def test_token(self, request):
        pass