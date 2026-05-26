import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiClock
} from 'react-icons/fi'

import Header from '../components/Header'
import api from '../services/api'

import '../styles/gerenciar.css'

function GerenciarFilmes() {
  const navigate = useNavigate()

  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')

  async function carregarFilmes() {
    try {
      const response = await api.get('filmes/', {
        params: {
          titulo: busca || undefined
        }
      })

      setFilmes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function excluirFilme(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este filme?'
    )

    if (!confirmar) return

    try {
      await api.delete(`filmes/${id}/`)

      carregarFilmes()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    carregarFilmes()
  }, [busca])

  return (
    <div className="gerenciar-page">
      <Header />

      <div className="gerenciar-top">
        <h1 className="gerenciar-title">
          GERENCIADOR DE FILMES
        </h1>

        <button
          className="gerenciar-add-button"
          onClick={() => navigate('/adicionar-filme')}
        >
          {isAdmin
            ? '+ Adicionar Filme'
            : '+ Solicitar Adição'}
        </button>
      </div>

      <div className="gerenciar-search">
        <FiSearch />

        <input
          type="text"
          placeholder="Buscar filme"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <section className="gerenciar-list">
        {filmes.map((filme) => (
          <div className="gerenciar-card" key={filme.id}>
            <img
              src={
                filme.poster ||
                'https://via.placeholder.com/300x450'
              }
              alt={filme.titulo}
              className="gerenciar-poster"
            />

            <div className="gerenciar-info">
              <h2>{filme.titulo}</h2>

              <div className="gerenciar-meta">
                <span>{filme.ano}</span>

                <span>•</span>

                <span>
                  {filme.genero_nome || 'Gênero'}
                </span>

                <span>•</span>

                <FiClock />

                <span>
                  {filme.duracao || '2h'}
                </span>
              </div>

              <p className="gerenciar-sinopse">
                {filme.sinopse?.slice(0, 180)}
              </p>

              <div className="gerenciar-actions">
                {isAdmin ? (
                  <>
                    <button
                      className="edit-button"
                      onClick={() =>
                        navigate(`/editar-filme/${filme.id}`)
                      }
                    >
                      <FiEdit2 />
                      Editar
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => excluirFilme(filme.id)}
                    >
                      <FiTrash2 />
                      Excluir
                    </button>
                  </>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/editar-filme/${filme.id}`)
                    }
                  >
                    <FiEdit2 />
                    Solicitar edição
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default GerenciarFilmes