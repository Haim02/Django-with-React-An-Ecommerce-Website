from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from base.serializer import ProductSerializer, UserSerializer, UserSerializerWithToken



# @csrf_exempt
@api_view(['POST'])
def login(request):
    user = get_object_or_404(get_user_model(), username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'detail': "Not found"}, status=status.HTTP_404_NOT_FOUND)
    token = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user, many=False)
    return Response({'token': token, 'user': UserSerializer.data})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
    # path('api/users/login', login),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
