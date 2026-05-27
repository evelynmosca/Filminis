import { NavLink, useNavigate } from 'react-router-dom'
import { FiUser, FiLogOut, FiBell } from 'react-icons/fi'

import '../styles/header.css'

function Header() {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  function logout() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <header className="main-header">
      <div className="header-left">
        <NavLink to="/home" className="header-logo">
          FILMINIS
        </NavLink>

        <nav className="header-menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/gerenciar">Gerenciar</NavLink>
        </nav>
      </div>

      <div className="header-right">
        {isAdmin && (
          <div className="notification-wrapper">
            <button type="button" className="notification-button">
              <FiBell />
              <span className="notification-dot" />
            </button>

            <div className="notification-dropdown">
              <button
                type="button"
                onClick={() => navigate('/solicitacoes/adicao')}
              >
                Solicitações de adição
              </button>

              <button
                type="button"
                onClick={() => navigate('/solicitacoes/edicao')}
              >
                Solicitações de edição
              </button>
            </div>
          </div>
        )}

        <div className="header-user">
          <div className="user-circle">
            <FiUser />
          </div>

          <span>{isAdmin ? 'Admin' : 'Usuário'}</span>
        </div>

        <button type="button" className="logout-button" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
    </header>
  )
}

export default Header