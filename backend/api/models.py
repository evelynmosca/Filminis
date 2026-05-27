from django.db import models
from django.contrib.auth.models import User


class Genero(models.Model):
    nome = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nome


class Diretor(models.Model):
    nome = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.nome


class Ator(models.Model):
    nome = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.nome


class Produtora(models.Model):
    nome = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.nome


class Pais(models.Model):
    nome = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nome


class Linguagem(models.Model):
    nome = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nome


class Filme(models.Model):
    titulo = models.CharField(max_length=200)
    ano = models.IntegerField()
    sinopse = models.TextField()
    poster = models.URLField(max_length=500, blank=True, null=True)
    orcamento = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    duracao = models.CharField(max_length=50, blank=True, null=True)

    genero = models.ForeignKey(Genero, on_delete=models.SET_NULL, null=True)
    diretor = models.ForeignKey(Diretor, on_delete=models.SET_NULL, null=True)
    produtora = models.ForeignKey(Produtora, on_delete=models.SET_NULL, null=True)
    pais = models.ForeignKey(Pais, on_delete=models.SET_NULL, null=True)
    linguagem = models.ForeignKey(Linguagem, on_delete=models.SET_NULL, null=True)

    atores = models.ManyToManyField(Ator, blank=True)

    aprovado = models.BooleanField(default=False)
    criado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    status_solicitacao = models.CharField(
    max_length=20,
    choices=[
        ('PENDENTE', 'Pendente'),
        ('APROVADA', 'Aprovada'),
        ('DECLINADA', 'Declinada'),
    ],
    default='PENDENTE'
)

    def __str__(self):
        return self.titulo


class SolicitacaoEdicao(models.Model):
    filme = models.ForeignKey(Filme, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    dados_novos = models.JSONField()
    dados_antigos = models.JSONField(blank=True, null=True)
    aprovado = models.BooleanField(default=False)
    recusado = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Edição solicitada: {self.filme.titulo}'