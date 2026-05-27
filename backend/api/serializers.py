from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Genero, Diretor, Ator, Produtora, Pais, Linguagem, Filme, SolicitacaoEdicao


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']


class CadastroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'


class DiretorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diretor
        fields = '__all__'


class AtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ator
        fields = '__all__'


class ProdutoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtora
        fields = '__all__'


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'


class LinguagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Linguagem
        fields = '__all__'


class FilmeSerializer(serializers.ModelSerializer):
    genero_nome = serializers.CharField(source='genero.nome', read_only=True)
    diretor_nome = serializers.CharField(source='diretor.nome', read_only=True)
    produtora_nome = serializers.CharField(source='produtora.nome', read_only=True)
    pais_nome = serializers.CharField(source='pais.nome', read_only=True)
    linguagem_nome = serializers.CharField(source='linguagem.nome', read_only=True)
    atores_nomes = serializers.SerializerMethodField()
    criado_por_nome = serializers.CharField(source='criado_por.username', read_only=True)

    class Meta:
        model = Filme
        fields = '__all__'

    def get_atores_nomes(self, obj):
        return [ator.nome for ator in obj.atores.all()]


class SolicitacaoEdicaoSerializer(serializers.ModelSerializer):
    filme_titulo = serializers.CharField(source='filme.titulo', read_only=True)
    usuario_nome = serializers.CharField(source='usuario.username', read_only=True)
    filme_dados = serializers.SerializerMethodField()

    class Meta:
        model = SolicitacaoEdicao
        fields = '__all__'

    def get_filme_dados(self, obj):
        filme = obj.filme

        return {
            'titulo': filme.titulo,
            'ano': filme.ano,
            'duracao': filme.duracao,
            'sinopse': filme.sinopse,
            'poster': filme.poster,
            'orcamento': str(filme.orcamento) if filme.orcamento else '',
            'genero': filme.genero.nome if filme.genero else '',
            'diretor': filme.diretor.nome if filme.diretor else '',
            'atores': [ator.nome for ator in filme.atores.all()],
            'produtora': filme.produtora.nome if filme.produtora else '',
            'pais': filme.pais.nome if filme.pais else '',
            'linguagem': filme.linguagem.nome if filme.linguagem else '',
        }