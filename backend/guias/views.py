from rest_framework import viewsets
from .models import Guia
from .serializers import GuiaSerialzer

class GuiaViewSet(viewsets.ModelViewSet):
    queryset = Guia.objects.all()
    serializer_class = GuiaSerialzer