import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FiFilm,
  FiUsers,
  FiGlobe,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiArrowLeft
} from 'react-icons/fi'

import Header from '../components/Header'
import api from '../services/api'
import '../styles/detalhes.css'

function DetalhesFilme() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [filme, setFilme] = useState(null)

  function textoDiretor(filme) {
    return (
      filme.diretor_nome ||
      filme.diretor?.nome ||
      filme.diretor ||
      'Não informado'
    )
  }

  function textoAtores(filme) {
    if (Array.isArray(filme.atores_nomes) && filme.atores_nomes.length > 0) {
      return filme.atores_nomes.join(', ')
    }

    if (Array.isArray(filme.atores) && filme.atores.length > 0) {
      return filme.atores.map((ator) => ator.nome || ator).join(', ')
    }

    return 'Não informado'
  }

  async function carregarFilme() {
    try {
      const response = await api.get(`filmes/${id}/`)
      console.log('FILME DETALHES:', response.data)
      setFilme(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    carregarFilme()
  }, [id])

  if (!filme) {
    return (
      <div className="detalhes-page">
        <Header />

        <button className="detalhes-voltar" onClick={() => navigate('/home')}>
          <FiArrowLeft />
          Detalhes do filme
        </button>

        <p className="detalhes-loading">Carregando filme...</p>
      </div>
    )
  }

  return (
    <div className="detalhes-page">
      <Header />

      <button className="detalhes-voltar" onClick={() => navigate('/home')}>
        <FiArrowLeft />
        Detalhes do filme
      </button>

      <main className="detalhes-container">
        <section className="detalhes-content">
          <img
            className="detalhes-poster"
            src={filme.poster || 'https://via.placeholder.com/300x450'}
            alt={filme.titulo}
          />

          <div className="detalhes-info">
            <h1>{filme.titulo}</h1>

            <p className="detalhes-ano">{filme.ano}</p>

            <div className="detalhes-tags">
              <span>{filme.genero_nome || 'Gênero'}</span>
            </div>

            <div className="detalhes-bloco">
              <h2>
                <FiFilm />
                Sinopse
              </h2>

              <p>{filme.sinopse || 'Não informado'}</p>
            </div>

            <div className="detalhes-bloco">
              <h2>
                <FiFilm />
                Diretor
              </h2>

              <p>{textoDiretor(filme)}</p>
            </div>

            <div className="detalhes-bloco">
              <h2>
                <FiUsers />
                Atores
              </h2>

              <p>{textoAtores(filme)}</p>
            </div>
          </div>
        </section>

        <section className="detalhes-extra">
          <div>
            <h3>
              <FiBriefcase />
              Produtora
            </h3>
            <p>{filme.produtora_nome || 'Não informado'}</p>
          </div>

          <div>
            <h3>
              <FiDollarSign />
              Orçamento
            </h3>
            <p>
              {filme.orcamento
                ? `US$ ${Number(filme.orcamento).toLocaleString('pt-BR')}`
                : 'Não informado'}
            </p>
          </div>

          <div>
            <h3>
              <FiMapPin />
              País
            </h3>
            <p>{filme.pais_nome || 'Não informado'}</p>
          </div>

          <div>
            <h3>
              <FiGlobe />
              Linguagem
            </h3>
            <p>{filme.linguagem_nome || 'Não informado'}</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DetalhesFilme