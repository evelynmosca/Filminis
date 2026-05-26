import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiFilter } from 'react-icons/fi'

import Header from '../components/Header'
import api from '../services/api'
import '../styles/home.css'

function Home() {
  const navigate = useNavigate()

  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')

  const [tipoFiltro, setTipoFiltro] = useState('')
  const [valorFiltro, setValorFiltro] = useState('')

  const [generos, setGeneros] = useState([])
  const [diretores, setDiretores] = useState([])
  const [atores, setAtores] = useState([])
  const [anos, setAnos] = useState([])

  async function carregarFilmes() {
    try {
      const response = await api.get('filmes/', {
        params: {
          titulo: busca || undefined,
          genero: tipoFiltro === 'genero' ? valorFiltro : undefined,
          diretor: tipoFiltro === 'diretor' ? valorFiltro : undefined,
          ator: tipoFiltro === 'ator' ? valorFiltro : undefined,
          ano: tipoFiltro === 'ano' ? valorFiltro : undefined
        }
      })

      setFilmes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function carregarFiltros() {
    try {
      const [
        generosResponse,
        diretoresResponse,
        atoresResponse,
        filmesResponse
      ] = await Promise.all([
        api.get('generos/'),
        api.get('diretores/'),
        api.get('atores/'),
        api.get('filmes/')
      ])

      setGeneros(generosResponse.data)
      setDiretores(diretoresResponse.data)
      setAtores(atoresResponse.data)

      const anosUnicos = [
        ...new Set(filmesResponse.data.map((filme) => filme.ano))
      ].sort((a, b) => b - a)

      setAnos(anosUnicos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    carregarFilmes()
  }, [busca, tipoFiltro, valorFiltro])

  useEffect(() => {
    carregarFiltros()
  }, [])

  return (
    <div className="home-page">
      <Header />

      <h1 className="home-title">EM CARTAZ</h1>

      <section className="home-filters">
        <div className="home-input-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Buscar filme"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="home-input-box filter-select">
          <FiFilter />

          <select
            value={tipoFiltro}
            onChange={(e) => {
              setTipoFiltro(e.target.value)
              setValorFiltro('')
            }}
          >
            <option value="">Filtrar por</option>
            <option value="genero">Gênero</option>
            <option value="ano">Ano</option>
            <option value="diretor">Diretor</option>
            <option value="ator">Ator</option>
          </select>
        </div>

        {tipoFiltro && (
          <div className="home-input-box filter-select">
            <select
              value={valorFiltro}
              onChange={(e) => setValorFiltro(e.target.value)}
            >
              <option value="">Selecionar</option>

              {tipoFiltro === 'genero' &&
                generos.map((genero) => (
                  <option key={genero.id} value={genero.nome}>
                    {genero.nome}
                  </option>
                ))}

              {tipoFiltro === 'ano' &&
                anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}

              {tipoFiltro === 'diretor' &&
                diretores.map((diretor) => (
                  <option key={diretor.id} value={diretor.nome}>
                    {diretor.nome}
                  </option>
                ))}

              {tipoFiltro === 'ator' &&
                atores.map((ator) => (
                  <option key={ator.id} value={ator.nome}>
                    {ator.nome}
                  </option>
                ))}
            </select>
          </div>
        )}
      </section>

      <section className="home-movies-grid">
        {filmes.map((filme) => (
          <div
            className="home-movie-card"
            key={filme.id}
            onClick={() => navigate(`/filmes/${filme.id}`)}
          >
            <img
              className="home-poster"
              src={filme.poster || 'https://via.placeholder.com/300x450'}
              alt={filme.titulo}
            />

            <h3>{filme.titulo}</h3>

            <p>
              {filme.genero_nome || 'Gênero'} • {filme.ano}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home