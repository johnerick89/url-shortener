from django.test import TestCase
from rest_framework import status
from django.test import TestCase, Client
from django.urls import resolve, reverse
import json
from .serializers import UrlSerializer
from .models import Url


client = Client()


class UrlTest(TestCase):
    """ Test module for URL model """

    def setUp(self):
        Url.objects.create(
            original='http://www.google.com', tiny='http://localhost:8000/')
        Url.objects.create(
            original='http://www.facebook.com', tiny='http://localhost:8000/')

    def test_url_object_created(self):
        url_google = Url.objects.get(original='http://www.google.com')
        self.assertIsNotNone(url_google)

    def test_url_shortened(self):
        url_facebook = Url.objects.get(original='http://www.facebook.com')
        self.assertNotEqual(url_facebook.tiny,'http://localhost:8000/')


class GetAllUrlsTest(TestCase):
    """ Test module for GET all Urls API """

    def setUp(self):
        Url.objects.create(
            original='http://www.google.com', tiny='http://localhost:8000/')
        Url.objects.create(
            original='http://www.facebook.com', tiny='http://localhost:8000/')

    def test_get_all_urls(self):
        response = self.client.get(resolve('/urls/'))

        urls = Url.objects.all()
        serializer = UrlSerializer(urls, many=True)
        self.assertEqual(response, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateNewUrlTest(TestCase):
    """ Test module for inserting a new url """

    def setUp(self):
        self.valid_payload = {
            'original': 'http://www.google.com'
        }
        self.invalid_payload = {
            'original': ''
        }

    def test_create_valid_url(self):
        path = resolve('/urls/')
        print(path)
        response = client.post(
            path,
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_url(self):
        response = client.post(
            resolve('/urls/'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
