from django.urls import path
from base.views import user_view as views

app_name = 'user'

urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', views.registerUser, name='register'),
    path('profile', views.getUser, name='users-profile'),
    path('profile/update', views.updateUserProfile, name='users-profile-updata'),
    path('', views.getUsers, name='users'),
]
