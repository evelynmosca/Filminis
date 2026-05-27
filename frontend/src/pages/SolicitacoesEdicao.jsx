import { useEffect, useState } from 'react'
import {
  FiChevronRight,
  FiX,
  FiCheck,
  FiLayers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiArrowRight
} from 'react-icons/fi'

import Header from '../components/Header'
import api from '../services/api'
import '../styles/solicitacoes.css'

function SolicitacoesEdicao() {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [selecionada, setSelecionada] = useState(null)
  const [filtroStatus, setFiltroStatus] = useState('pendentes')

  async function carregarSolicitacoes() {
    try {
      const response = await api.get('solicitacoes-edicao/')
      setSolicitacoes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function aprovarSolicitacao(id) {
    try {
      await api.post(`solicitacoes-edicao/${id}/aprovar/`)
      alert('Edição aprovada com sucesso!')
      setSelecionada(null)
      carregarSolicitacoes()
    } catch (error) {
      console.log(error)
      alert('Erro ao aprovar edição.')
    }
  }

  async function recusarSolicitacao(id) {
    try {
      await api.post(`solicitacoes-edicao/${id}/recusar/`)
      alert('Edição recusada com sucesso!')
      setSelecionada(null)
      carregarSolicitacoes()
    } catch (error) {
      console.log(error)
      alert('Erro ao recusar edição.')
    }
  }

  function statusSolicitacao(item) {
    if (item.aprovado) return 'Aprovada'
    if (item.recusado) return 'Declinada'
    return 'Pendente'
  }

  function normalizarValor(valor) {
    if (Array.isArray(valor)) {
      return valor.map(String).join(', ')
    }

    if (valor === null || valor === undefined) {
      return ''
    }

    return String(valor).trim()
  }

  function valorAntes(item, chave) {
    const dadosAntigos = item?.dados_antigos || item?.filme_dados
    const valor = dadosAntigos?.[chave]

    if (Array.isArray(valor)) {
      return valor.join(', ')
    }

    if (valor === null || valor === undefined || valor === '') {
      return 'Não informado'
    }

    return String(valor)
  }

  function valorDepois(item, chave) {
    const valor = item?.dados_novos?.[chave]

    if (Array.isArray(valor)) {
      return valor.join(', ')
    }

    if (valor === null || valor === undefined || valor === '') {
      return 'Não informado'
    }

    return String(valor)
  }

  function camposAlterados(item) {
    const dadosAntigos = item?.dados_antigos || item?.filme_dados

    if (!item?.dados_novos || !dadosAntigos) return []

    const campos = [
      { chave: 'titulo', label: 'Título' },
      { chave: 'ano', label: 'Ano' },
      { chave: 'duracao', label: 'Duração' },
      { chave: 'sinopse', label: 'Sinopse' },
      { chave: 'poster', label: 'Poster' },
      { chave: 'orcamento', label: 'Orçamento' },
      { chave: 'genero', label: 'Gênero' },
      { chave: 'diretor', label: 'Diretor' },
      { chave: 'atores', label: 'Elenco' },
      { chave: 'produtora', label: 'Produtora' },
      { chave: 'pais', label: 'País' },
      { chave: 'linguagem', label: 'Idioma' }
    ]

    return campos.filter((campo) => {
      const depoisExiste = item.dados_novos[campo.chave] !== undefined

      if (!depoisExiste) return false

      const antes = normalizarValor(dadosAntigos[campo.chave])
      const depois = normalizarValor(item.dados_novos[campo.chave])

      return depois !== '' && antes !== depois
    })
  }

  function filtrarSolicitacoes() {
    if (filtroStatus === 'todas') return solicitacoes

    if (filtroStatus === 'pendentes') {
      return solicitacoes.filter((item) => !item.aprovado && !item.recusado)
    }

    if (filtroStatus === 'aprovadas') {
      return solicitacoes.filter((item) => item.aprovado)
    }

    if (filtroStatus === 'declinadas') {
      return solicitacoes.filter((item) => item.recusado)
    }

    return solicitacoes
  }

  function contarPendentes() {
    return solicitacoes.filter((item) => !item.aprovado && !item.recusado).length
  }

  function contarAprovadas() {
    return solicitacoes.filter((item) => item.aprovado).length
  }

  function contarDeclinadas() {
    return solicitacoes.filter((item) => item.recusado).length
  }

  useEffect(() => {
    carregarSolicitacoes()
  }, [])

  const solicitacoesFiltradas = filtrarSolicitacoes()

  return (
    <div className="solicitacoes-page">
      <Header />

      <h1 className="solicitacoes-title">Solicitações de Edição</h1>

      <section className="status-grid">
        <button
          type="button"
          className={`status-card ${filtroStatus === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltroStatus('todas')}
        >
          <div>
            <span>TOTAL</span>
            <strong>{solicitacoes.length}</strong>
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
            <strong>{contarPendentes()}</strong>
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
            <strong>{contarAprovadas()}</strong>
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
            <strong>{contarDeclinadas()}</strong>
          </div>
          <FiXCircle className="red" />
        </button>
      </section>

      <section className="solicitacoes-table edicao-table">
        <div className="table-header edicao-header">
          <span>Filme</span>
          <span>Solicitante</span>
          <span>Mudanças</span>
          <span>Status</span>
          <span></span>
        </div>

        {solicitacoesFiltradas.length > 0 ? (
          solicitacoesFiltradas.map((item) => (
            <div
              className="table-row edicao-row"
              key={item.id}
              onClick={() => setSelecionada(item)}
            >
              <span>{item.filme_titulo || 'Filme'}</span>
              <span>{item.usuario_nome || 'Usuário'}</span>
              <span>{camposAlterados(item).length} campos</span>
              <span>{statusSolicitacao(item)}</span>
              <FiChevronRight />
            </div>
          ))
        ) : (
          <div className="empty-row">Nenhuma solicitação encontrada.</div>
        )}
      </section>

      {selecionada && (
        <aside className="side-modal side-modal-large">
          <button className="modal-close" onClick={() => setSelecionada(null)}>
            <FiX />
          </button>

          <div className="modal-user-card">
            <h3>Solicitante</h3>

            <div className="modal-user-info">
              <div className="modal-user-icon">
                <FiUser />
              </div>

              <div>
                <strong>{selecionada.usuario_nome || 'Usuário'}</strong>
                <p>Solicitação de edição</p>
              </div>
            </div>
          </div>

          <div className="modal-changes-card">
            <div className="changes-title-row">
              <h3>Alterações Propostas</h3>
              <span>({camposAlterados(selecionada).length} campos)</span>
            </div>

            <div className="changes-list">
              {camposAlterados(selecionada).length > 0 ? (
                camposAlterados(selecionada).map((campo) => (
                  <div className="change-card" key={campo.chave}>
                    <h4>{campo.label}</h4>

                    <div className="change-comparison">
                      <div>
                        <span className="before-label">Antes</span>
                        <p>{valorAntes(selecionada, campo.chave)}</p>
                      </div>

                      <FiArrowRight />

                      <div>
                        <span className="after-label">Depois</span>
                        <p>{valorDepois(selecionada, campo.chave)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-changes">Nenhuma alteração diferente foi encontrada.</p>
              )}
            </div>
          </div>

          {!selecionada.aprovado && !selecionada.recusado && (
            <div className="modal-actions">
              <button
                className="decline-button"
                onClick={() => recusarSolicitacao(selecionada.id)}
              >
                <FiX />
                Declinar alterações
              </button>

              <button
                className="approve-button"
                onClick={() => aprovarSolicitacao(selecionada.id)}
              >
                <FiCheck />
                Aprovar alterações
              </button>
            </div>
          )}
        </aside>
      )}
    </div>
  )
}

export default SolicitacoesEdicao