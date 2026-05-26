import { useEffect, useState } from 'react'
import {
  FiChevronRight,
  FiX,
  FiCheck,
  FiLayers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser
} from 'react-icons/fi'

import Header from '../components/Header'
import api from '../services/api'
import '../styles/solicitacoes.css'

function SolicitacoesAdicao() {
  const [filmes, setFilmes] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [filtroStatus, setFiltroStatus] = useState('pendentes')

  async function carregarSolicitacoes() {
    try {
      const response = await api.get('filmes/pendentes/')
      setFilmes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function aprovarFilme(id) {
    try {
      await api.post(`filmes/${id}/aprovar/`)
      alert('Filme aprovado com sucesso!')
      setSelecionado(null)
      carregarSolicitacoes()
    } catch (error) {
      console.log(error)
      alert('Erro ao aprovar filme.')
    }
  }

  async function recusarFilme(id) {
    try {
      await api.post(`filmes/${id}/recusar/`)
      alert('Solicitação recusada com sucesso!')
      setSelecionado(null)
      carregarSolicitacoes()
    } catch (error) {
      console.log(error)
      alert('Erro ao recusar solicitação.')
    }
  }

  useEffect(() => {
    carregarSolicitacoes()
  }, [])

  const filmesFiltrados =
    filtroStatus === 'pendentes' || filtroStatus === 'todas'
      ? filmes
      : []

  return (
    <div className="solicitacoes-page">
      <Header />

      <h1 className="solicitacoes-title">Solicitações de Adição</h1>

      <section className="status-grid">
        <button
          type="button"
          className={`status-card ${filtroStatus === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltroStatus('todas')}
        >
          <div>
            <span>TOTAL</span>
            <strong>{filmes.length}</strong>
          </div>
          <FiLayers />
        </button>

        <button
          type="button"
          className={`status-card ${filtroStatus === 'pendentes' ? 'active' : ''}`}
          onClick={() => setFiltroStatus('pendentes')}
        >
          <div>
            <span>PENDENTES</span>
            <strong>{filmes.length}</strong>
          </div>
          <FiClock />
        </button>

        <button
          type="button"
          className={`status-card ${filtroStatus === 'aprovadas' ? 'active' : ''}`}
          onClick={() => setFiltroStatus('aprovadas')}
        >
          <div>
            <span>APROVADAS</span>
            <strong>0</strong>
          </div>
          <FiCheckCircle className="green" />
        </button>

        <button
          type="button"
          className={`status-card ${filtroStatus === 'declinadas' ? 'active' : ''}`}
          onClick={() => setFiltroStatus('declinadas')}
        >
          <div>
            <span>DECLINADAS</span>
            <strong>0</strong>
          </div>
          <FiXCircle className="red" />
        </button>
      </section>

      <section className="solicitacoes-table">
        <div className="table-header">
          <span>Filme</span>
          <span>Solicitante</span>
          <span>Status</span>
          <span></span>
        </div>

        {filmesFiltrados.length > 0 ? (
          filmesFiltrados.map((filme) => (
            <div
              className="table-row"
              key={filme.id}
              onClick={() => setSelecionado(filme)}
            >
              <span>{filme.titulo}</span>
              <span>{filme.criado_por_nome || 'Usuário'}</span>
              <span>Pendente</span>
              <FiChevronRight />
            </div>
          ))
        ) : (
          <div className="empty-row">
            Nenhuma solicitação encontrada.
          </div>
        )}
      </section>

      {selecionado && (
        <aside className="side-modal">
          <button className="modal-close" onClick={() => setSelecionado(null)}>
            <FiX />
          </button>

          <div className="modal-user-card">
            <h3>Solicitante</h3>

            <div className="modal-user-info">
              <div className="modal-user-icon">
                <FiUser />
              </div>

              <div>
                <strong>{selecionado.criado_por_nome || 'Usuário'}</strong>
                <p>Solicitação de adição</p>
              </div>
            </div>
          </div>

          <div className="modal-changes-card">
            <h3>Dados do Filme</h3>

            <div className="addition-fields">
              <div>
                <span>Título</span>
                <p>{selecionado.titulo || 'Não informado'}</p>
              </div>

              <div>
                <span>Gênero</span>
                <p>{selecionado.genero_nome || 'Não informado'}</p>
              </div>

              <div>
                <span>Ano</span>
                <p>{selecionado.ano || 'Não informado'}</p>
              </div>

              <div>
                <span>Diretor</span>
                <p>{selecionado.diretor_nome || 'Não informado'}</p>
              </div>

              <div>
                <span>Duração</span>
                <p>{selecionado.duracao || 'Não informado'}</p>
              </div>

              <div>
                <span>Elenco</span>
                <p>
                  {selecionado.atores_nomes?.length
                    ? selecionado.atores_nomes.join(', ')
                    : 'Não informado'}
                </p>
              </div>

              <div>
                <span>Idioma</span>
                <p>{selecionado.linguagem_nome || 'Não informado'}</p>
              </div>

              <div>
                <span>Produtora</span>
                <p>{selecionado.produtora_nome || 'Não informado'}</p>
              </div>

              <div>
                <span>Sinopse</span>
                <p>{selecionado.sinopse || 'Não informado'}</p>
              </div>

              <div>
                <span>Poster</span>
                <p>{selecionado.poster || 'Não informado'}</p>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button
              className="decline-button"
              onClick={() => recusarFilme(selecionado.id)}
            >
              <FiX />
              Declinar alterações
            </button>

            <button
              className="approve-button"
              onClick={() => aprovarFilme(selecionado.id)}
            >
              <FiCheck />
              Aprovar alterações
            </button>
          </div>
        </aside>
      )}
    </div>
  )
}

export default SolicitacoesAdicao