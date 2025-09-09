from django.db import models

class Guia(models.Model):
    ESTADOS = [
        ("activa", "Activa"),
        ("transito", "En tránsito"),
        ("entregada", "Entregada"),
    ]

    codigo = models.CharField(max_length=100, unique=True)
    origen = models.CharField(max_length=200)
    destino = models.CharField(max_length=200)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="activa")
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.codigo} - {self.estado}"