from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.shortcuts import redirect
from api.models import Url
from api.serializers import UrlSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from pprint import pprint

class UrlList(APIView):
    """
    List all URLs, or create a new URL
    """
    def get(self, request, format=None):
        urls = Url.objects.all()
        serializer = UrlSerializer(urls, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        serializer = UrlSerializer(data=data)
        current_url = request.build_absolute_uri('/')
        data.update({"tiny":current_url})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UrlDetail(APIView):
    """
    Retrieve, update or delete an URL record
    """
    def get_object(self, pk):
        try:
            return Url.objects.get(pk=pk)
        except Url.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        url = self.get_object(pk)
        serializer = UrlSerializer(url)
        return JsonResponse(serializer.data)

    def put(self, request, pk, format=None):
        url = self.get_object(pk)
        serializer = UrlSerializer(url, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        url = self.get_object(pk)
        url.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UrlRedirect(APIView):
    """
    Given a tiny URL, redirect to the original page
    """

    def get_object(self, current_url):
        try:
            return Url.objects.get(tiny=current_url)
        except Url.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        current_url = request.build_absolute_uri()
        url = self.get_object(current_url=current_url)
        serializer = UrlSerializer(url)
        original_url = serializer.data["original"]
        return redirect(original_url)
