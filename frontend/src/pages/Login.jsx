import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiLock } from 'react-icons/fi'
import api from '../services/api'
import '../styles/login.css'

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!form.username || !form.password) {
      setErro('Preencha usuário e senha')
      return
    }

    try {
      setCarregando(true)

      const loginResponse = await api.post('login/', {
        username: form.username,
        password: form.password
      })

      localStorage.setItem('access', loginResponse.data.access)
      localStorage.setItem('refresh', loginResponse.data.refresh)

      const userResponse = await api.get('usuario-logado/')

      localStorage.setItem('usuario', userResponse.data.username)
      localStorage.setItem('isAdmin', String(userResponse.data.is_staff))

      navigate('/home')
    } catch (error) {
      console.log(error)
      setErro('Usuário ou senha inválidos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>FILMINIS</h1>
        </div>

        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-group">
            <label>Usuário</label>

            <div className="input-container">
              <FiUser />
              <input
                type="text"
                name="username"
                placeholder="Seu usuário"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="login-group">
            <label>Senha</label>

            <div className="input-container">
              <FiLock />
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {erro && <p className="login-error">{erro}</p>}

          <button type="submit" className="login-button" disabled={carregando}>
            {carregando ? 'Entrando...' : 'login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login