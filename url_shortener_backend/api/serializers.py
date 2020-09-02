from rest_framework import serializers
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from api.models import Url
from django.http import Http404
from pprint import pprint
import json
from decimal import Decimal
import decimal
import socket


class UrlSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.CharField(read_only=True)
    original = serializers.CharField(required=True, max_length=1000)
    tiny = serializers.CharField(required=False, max_length=100)
    clicks = serializers.CharField(read_only=True)

    class Meta:
        model = Url
        fields = (
            'original', 'tiny', 'id', 'clicks')

    def _is_valid_url(self, original):
        val = URLValidator()
        try:
            val(original)
        except ValidationError as e:
            raise serializers.ValidationError({original: "Enter a valid URL in the original url field"})

    def validate(self, data):
        original = data['original']
        if original is None:
            raise serializers.ValidationError({original: "This field should not be left empty."})
        else:
            self._is_valid_url(original)
        return data

    def create(self, validated_data):
        """
        Create and return a new `URL` instance, given the validated data.
        """
        return Url.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `URL` instance, given the validated data.
        """
        instance.original = validated_data.get('original', instance.original)
        instance.tiny = validated_data.get('tiny', instance.tiny)
        instance.save()
        return instance

