from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    cadastro,
    usuario_logado,
    GeneroViewSet,
    DiretorViewSet,
    AtorViewSet,
    ProdutoraViewSet,
    PaisViewSet,
    LinguagemViewSet,
    FilmeViewSet,
    SolicitacaoEdicaoViewSet
)

router = DefaultRouter()

router.register(r'generos', GeneroViewSet)
router.register(r'diretores', DiretorViewSet)
router.register(r'atores', AtorViewSet)
router.register(r'produtoras', ProdutoraViewSet)
router.register(r'paises', PaisViewSet)
router.register(r'linguagens', LinguagemViewSet)
router.register(r'filmes', FilmeViewSet, basename='filmes')
router.register(r'solicitacoes-edicao', SolicitacaoEdicaoViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('cadastro/', cadastro),
    path('usuario-logado/', usuario_logado),

    path('login/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]