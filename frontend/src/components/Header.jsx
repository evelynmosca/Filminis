import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi'

import '../styles/header.css'

function Header() {
  const navigate = useNavigate()

  const usuario = localStorage.getItem('usuario')
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  function logout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('usuario')
    localStorage.removeItem('isAdmin')

    navigate('/')
  }

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/home" className="header-logo">
          FILMINIS
        </Link>

        <nav className="header-menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/gerenciar">Gerenciar</NavLink>
        </nav>
      </div>

      <div className="header-right">
        {isAdmin && (
          <Link to="/solicitacoes/adicao" className="header-icon bell-icon">
            <FiBell />
            <span />
          </Link>
        )}

        <div className="header-user">
          <div className="user-circle">
            <FiUser />
          </div>

          <span>{isAdmin ? 'Admin' : 'Usuário'}</span>
        </div>

        <button className="logout-button" onClick={logout} title="Sair">
          <FiLogOut />
        </button>
      </div>
    </header>
  )
}

export default Header