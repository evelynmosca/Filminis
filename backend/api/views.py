from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Genero, Diretor, Ator, Produtora, Pais, Linguagem, Filme, SolicitacaoEdicao
from .serializers import (
    UserSerializer,
    CadastroSerializer,
    GeneroSerializer,
    DiretorSerializer,
    AtorSerializer,
    ProdutoraSerializer,
    PaisSerializer,
    LinguagemSerializer,
    FilmeSerializer,
    SolicitacaoEdicaoSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def cadastro(request):
    serializer = CadastroSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logado(request):
    return Response(UserSerializer(request.user).data)


class BaseNomeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['nome']


class GeneroViewSet(BaseNomeViewSet):
    queryset = Genero.objects.all().order_by('nome')
    serializer_class = GeneroSerializer


class DiretorViewSet(BaseNomeViewSet):
    queryset = Diretor.objects.all().order_by('nome')
    serializer_class = DiretorSerializer


class AtorViewSet(BaseNomeViewSet):
    queryset = Ator.objects.all().order_by('nome')
    serializer_class = AtorSerializer


class ProdutoraViewSet(BaseNomeViewSet):
    queryset = Produtora.objects.all().order_by('nome')
    serializer_class = ProdutoraSerializer


class PaisViewSet(BaseNomeViewSet):
    queryset = Pais.objects.all().order_by('nome')
    serializer_class = PaisSerializer


class LinguagemViewSet(BaseNomeViewSet):
    queryset = Linguagem.objects.all().order_by('nome')
    serializer_class = LinguagemSerializer


class FilmeViewSet(viewsets.ModelViewSet):
    serializer_class = FilmeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'titulo',
        'genero__nome',
        'diretor__nome',
        'atores__nome',
        'ano'
    ]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = Filme.objects.all().order_by('-id')

        if not self.request.user.is_authenticated or not self.request.user.is_staff:
            queryset = queryset.filter(aprovado=True)

        titulo = self.request.query_params.get('titulo')
        genero = self.request.query_params.get('genero')
        ano = self.request.query_params.get('ano')
        diretor = self.request.query_params.get('diretor')
        ator = self.request.query_params.get('ator')

        if titulo:
            queryset = queryset.filter(titulo__icontains=titulo)

        if genero:
            queryset = queryset.filter(genero__nome__icontains=genero)

        if ano:
            queryset = queryset.filter(ano=ano)

        if diretor:
            queryset = queryset.filter(diretor__nome__icontains=diretor)

        if ator:
            queryset = queryset.filter(atores__nome__icontains=ator)

        return queryset.distinct()

    def perform_create(self, serializer):
        serializer.save(
            criado_por=self.request.user,
            aprovado=self.request.user.is_staff,
            status_solicitacao='APROVADA' if self.request.user.is_staff else 'PENDENTE'
        )

    def update(self, request, *args, **kwargs):
        filme = self.get_object()

        if request.user.is_staff:
            return super().update(request, *args, **kwargs)

        dados_recebidos = request.data.copy()
        dados_alterados = {}

        campos_simples = [
            'titulo',
            'ano',
            'duracao',
            'sinopse',
            'poster',
            'orcamento'
        ]

        for campo in campos_simples:
            if campo not in dados_recebidos:
                continue

            valor_novo = dados_recebidos.get(campo)
            valor_atual = getattr(filme, campo)

            if valor_atual is None:
                valor_atual = ''

            if str(valor_novo).strip() != str(valor_atual).strip():
                dados_alterados[campo] = valor_novo

        relacionamentos = {
            'genero': filme.genero_id,
            'diretor': filme.diretor_id,
            'produtora': filme.produtora_id,
            'pais': filme.pais_id,
            'linguagem': filme.linguagem_id,
        }

        for campo, valor_atual in relacionamentos.items():
            if campo not in dados_recebidos:
                continue

            valor_novo = dados_recebidos.get(campo)

            if valor_novo in ['', None]:
                valor_novo = None

            if valor_atual is not None:
                valor_atual = str(valor_atual)

            if valor_novo is not None:
                valor_novo = str(valor_novo)

            if valor_novo != valor_atual:
                dados_alterados[campo] = dados_recebidos.get(campo)

        if 'atores' in dados_recebidos:
            atores_novos = dados_recebidos.get('atores', [])

            if atores_novos is None:
                atores_novos = []

            atores_atuais = list(filme.atores.values_list('id', flat=True))

            atores_novos = sorted([int(ator_id) for ator_id in atores_novos])
            atores_atuais = sorted([int(ator_id) for ator_id in atores_atuais])

            if atores_novos != atores_atuais:
                dados_alterados['atores'] = atores_novos

        if not dados_alterados:
            return Response(
                {'mensagem': 'Nenhuma alteração foi identificada.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        SolicitacaoEdicao.objects.create(
            filme=filme,
            usuario=request.user,
            dados_antigos={
                'titulo': filme.titulo,
                'ano': filme.ano,
                'duracao': filme.duracao,
                'sinopse': filme.sinopse,
                'poster': filme.poster,
                'orcamento': str(filme.orcamento) if filme.orcamento else '',
                'genero': filme.genero.nome if filme.genero else '',
                'diretor': filme.diretor.nome if filme.diretor else '',
                'atores': list(filme.atores.values_list('nome', flat=True)),
                'produtora': filme.produtora.nome if filme.produtora else '',
                'pais': filme.pais.nome if filme.pais else '',
                'linguagem': filme.linguagem.nome if filme.linguagem else '',
            },
            dados_novos=dados_alterados
)

        return Response(
            {'mensagem': 'Solicitação de edição enviada para aprovação.'},
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response(
                {'erro': 'Apenas administradores podem deletar filmes.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def pendentes(self, request):
        filmes = Filme.objects.filter(aprovado=False).order_by('-id')
        serializer = self.get_serializer(filmes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def aprovar(self, request, pk=None):
        filme = self.get_object()

        filme.aprovado = True
        filme.status_solicitacao = 'APROVADA'

        filme.save()

        return Response({
            'mensagem': 'Filme aprovado com sucesso.'
        })

        @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
        def recusar(self, request, pk=None):
            filme = self.get_object()

            filme.status_solicitacao = 'DECLINADA'

            filme.save()

            return Response({
                'mensagem': 'Solicitação recusada com sucesso.'
            })
    
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def solicitacoes_adicao(self, request):
        filmes = Filme.objects.filter(
            criado_por__isnull=False
        ).exclude(
            criado_por__is_staff=True
        ).order_by('-id')

        serializer = self.get_serializer(filmes, many=True)
        return Response(serializer.data)

class SolicitacaoEdicaoViewSet(viewsets.ModelViewSet):
    queryset = SolicitacaoEdicao.objects.all().order_by('-id')
    serializer_class = SolicitacaoEdicaoSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=['post'])
    def aprovar(self, request, pk=None):
        solicitacao = self.get_object()
        filme = solicitacao.filme
        dados = solicitacao.dados_novos

        serializer = FilmeSerializer(filme, data=dados, partial=True)

        if serializer.is_valid():
            serializer.save()
            solicitacao.aprovado = True
            solicitacao.save()

            return Response({'mensagem': 'Edição aprovada com sucesso.'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def recusar(self, request, pk=None):
        solicitacao = self.get_object()
        solicitacao.recusado = True
        solicitacao.save()

        return Response({'mensagem': 'Edição recusada com sucesso.'})