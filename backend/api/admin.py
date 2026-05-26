from django.contrib import admin
from .models import Genero, Diretor, Ator, Produtora, Pais, Linguagem, Filme, SolicitacaoEdicao

admin.site.register(Genero)
admin.site.register(Diretor)
admin.site.register(Ator)
admin.site.register(Produtora)
admin.site.register(Pais)
admin.site.register(Linguagem)
admin.site.register(Filme)
admin.site.register(SolicitacaoEdicao)