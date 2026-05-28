import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiUser, FiLogOut, FiBell } from 'react-icons/fi'

import api from '../services/api'
import '../styles/header.css'

function Header() {
  const navigate = useNavigate()

  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  const [menuAberto, setMenuAberto] = useState(false)
  const [temNotificacao, setTemNotificacao] = useState(false)

  function logout() {
    localStorage.clear()
    navigate('/')
  }

  async function carregarNotificacoes() {
    if (!isAdmin) return

    try {
      const [adicaoResponse, edicaoResponse] = await Promise.all([
        api.get('filmes/solicitacoes_adicao/'),
        api.get('solicitacoes-edicao/')
      ])

      const adicoesPendentes = adicaoResponse.data.filter(
        (item) => item.status_solicitacao === 'PENDENTE'
      )

      const edicoesPendentes = edicaoResponse.data.filter(
        (item) => !item.aprovado && !item.recusado
      )

      setTemNotificacao(adicoesPendentes.length > 0 || edicoesPendentes.length > 0)
    } catch (error) {
      console.log(error)
    }
  }

  function irParaSolicitacoesAdicao() {
    setMenuAberto(false)
    navigate('/solicitacoes/adicao')
  }

  function irParaSolicitacoesEdicao() {
    setMenuAberto(false)
    navigate('/solicitacoes/edicao')
  }

  useEffect(() => {
    carregarNotificacoes()
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">FILMINIS</h1>

        <nav className="header-menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/gerenciar">Gerenciar</NavLink>
        </nav>
      </div>

      <div className="header-right">
        {isAdmin && (
          <div className="notification-wrapper">
            <button
              type="button"
              className="notification-button"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              <FiBell />
              {temNotificacao && <span className="notification-dot"></span>}
            </button>

            {menuAberto && (
              <div className="notification-dropdown">
                <button type="button" onClick={irParaSolicitacoesAdicao}>
                  Solicitações de adição
                </button>

                <button type="button" onClick={irParaSolicitacoesEdicao}>
                  Solicitações de edição
                </button>
              </div>
            )}
          </div>
        )}

        <div className="header-user">
          <div className="user-circle">
            <FiUser />
          </div>

          <span>{isAdmin ? 'Admin' : 'Usuário'}</span>
        </div>

        <button className="logout-button" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
    </header>
  )
}

export default Header