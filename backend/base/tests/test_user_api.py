from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:register')
TOKEN_URL = reverse('user:token_obtain_pair')

def create_user(**params):
    """create and return a new user"""
    return get_user_model().objects.create(**params)

class PublicUserApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        user = {
            'name': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'test12345678'
        }

        res = self.client.post(CREATE_USER_URL, user)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_user_with_email_exist_error(self):
         user = {
            'username': 'test@gmail.com',
            'email': 'test@gmail.com',
            'password': 'test12345678'
        }

         create_user(**user)
         res = self.client.post(CREATE_USER_URL, user)

         self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_login(self):
    #      user = {
    #         'username': 'test@gmail.com',
    #         'email': 'test@gmail.com',
    #         'password': 'test12345678'
    #     }

    #      create_user(**user)
    #      login_user = {
    #         'username': 'test@gmail.com',
    #         'email': 'test@gmail.com',
    #         'password': 'test12345678'
    #     }
    #      res = self.client.post(TOKEN_URL, login_user)
    #      self.assertIn('token', res.data)
    #      self.assertEqual(res.status_code, status.HTTP_200_OK)