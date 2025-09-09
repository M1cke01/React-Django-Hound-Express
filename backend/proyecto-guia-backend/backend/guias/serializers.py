from rest_framework import serializers
from .models import Guia

class GuiaSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Guia
        fields = "__all__"