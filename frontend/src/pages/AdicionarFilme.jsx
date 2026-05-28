import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiSend, FiArrowLeft, FiPlus, FiX, FiCheck } from 'react-icons/fi'

import Header from '../components/Header'
import api from '../services/api'
import '../styles/filmeForm.css'

function AdicionarFilme() {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  const [generos, setGeneros] = useState([])
  const [posterUrl, setPosterUrl] = useState('')
  const [mostrarPopup, setMostrarPopup] = useState(false)

  const [form, setForm] = useState({
    titulo: '',
    ano: '',
    duracao: '',
    linguagem: '',
    produtora: '',
    genero: '',
    diretor: '',
    atores: '',
    sinopse: '',
    poster: '',
    orcamento: '',
    pais: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function formatarDuracao(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 4)

    if (numeros.length === 0) return ''

    if (numeros.length <= 2) {
      return numeros
    }

    const horas = numeros.slice(0, numeros.length - 2)
    const minutos = numeros.slice(-2)

    return `${horas}:${minutos}`
  }

  function duracaoParaBackend(valor) {
    if (!valor) return null
    if (!valor.includes(':')) return `${String(valor).padStart(2, '0')}:00:00`
    return `${valor}:00`
  }

  function formatarOrcamento(valor) {
    const numeros = valor.replace(/\D/g, '')
    if (!numeros) return ''
    return Number(numeros).toLocaleString('pt-BR')
  }

  function limparOrcamento(valor) {
    const numeros = String(valor).replace(/\D/g, '')
    return numeros || null
  }

  function abrirPopupPoster() {
    setPosterUrl(form.poster || '')
    setMostrarPopup(true)
  }

  function confirmarPoster() {
    setForm({ ...form, poster: posterUrl })
    setMostrarPopup(false)
  }

  async function carregarGeneros() {
    try {
      const response = await api.get('generos/')
      setGeneros(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function buscarOuCriar(endpoint, nome) {
    if (!nome) return null

    const response = await api.get(endpoint)

    const itemExistente = response.data.find(
      (item) => item.nome.toLowerCase() === nome.toLowerCase()
    )

    if (itemExistente) return itemExistente.id

    const novoItem = await api.post(endpoint, { nome })
    return novoItem.data.id
  }

  async function prepararDados() {
    const diretorId = await buscarOuCriar('diretores/', form.diretor)
    const produtoraId = await buscarOuCriar('produtoras/', form.produtora)
    const paisId = await buscarOuCriar('paises/', form.pais)
    const linguagemId = await buscarOuCriar('linguagens/', form.linguagem)

    const nomesAtores = form.atores.split(',').map((ator) => ator.trim()).filter(Boolean)
    const atoresIds = []

    for (const nome of nomesAtores) {
      const atorId = await buscarOuCriar('atores/', nome)
      if (atorId) atoresIds.push(atorId)
    }

    return {
      titulo: form.titulo,
      ano: Number(form.ano),
      duracao: duracaoParaBackend(form.duracao),
      sinopse: form.sinopse,
      poster: form.poster,
      orcamento: limparOrcamento(form.orcamento),
      genero: form.genero,
      diretor: diretorId,
      produtora: produtoraId,
      pais: paisId,
      linguagem: linguagemId,
      atores: atoresIds
    }
  }

  async function salvar(e) {
    e.preventDefault()

    try {
      const dados = await prepararDados()
      await api.post('filmes/', dados)

      alert(isAdmin ? 'Filme adicionado com sucesso!' : 'Solicitação de adição enviada para aprovação!')
      navigate('/gerenciar')
    } catch (error) {
      console.log('ERRO DO BACKEND:', error.response?.data)
      alert('Erro ao adicionar filme.')
    }
  }

  useEffect(() => {
    carregarGeneros()
  }, [])

  return (
    <div className="filme-form-page">
      <Header />

      <div className="filme-form-top">
        <div className="form-title-area">
          <button className="back-button" onClick={() => navigate('/gerenciar')} type="button">
            <FiArrowLeft />
          </button>

          <h1>ADICIONAR FILME</h1>
        </div>
      </div>

      <form className="adicionar-layout" onSubmit={salvar}>
        <div className="poster-card">
          {form.poster ? (
            <img className="poster-preview" src={form.poster} alt="Poster do filme" onClick={abrirPopupPoster} />
          ) : (
            <button type="button" className="poster-button" onClick={abrirPopupPoster}>
              <FiPlus />
              Adicionar poster
            </button>
          )}
        </div>

        <div className="filme-form adicionar-form">
          <section className="form-card">
            <label>Título</label>
            <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Nome do filme" required />

            <div className="form-grid">
              <div>
                <label>Ano</label>
                <input name="ano" value={form.ano} onChange={handleChange} placeholder="2008" required />
              </div>

              <div>
                <label>Produtora</label>
                <input name="produtora" value={form.produtora} onChange={handleChange} placeholder="Warner" />
              </div>

              <div>
                <label>Idioma</label>
                <input name="linguagem" value={form.linguagem} onChange={handleChange} placeholder="Inglês" />
              </div>

              <div>
                <label>País</label>
                <input name="pais" value={form.pais} onChange={handleChange} placeholder="Inglaterra" />
              </div>

              <div>
                <label>Duração</label>
                <input
                  name="duracao"
                  value={form.duracao}
                  onChange={(e) => setForm({ ...form, duracao: formatarDuracao(e.target.value) })}
                  placeholder="01:33"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label>Orçamento</label>
                <input
                  name="orcamento"
                  value={form.orcamento}
                  onChange={(e) => setForm({ ...form, orcamento: formatarOrcamento(e.target.value) })}
                  placeholder="Ex: 260000000"
                />
              </div>
            </div>
          </section>

          <section className="form-card">
            <label>Gênero</label>
            <select name="genero" value={form.genero} onChange={handleChange} required>
              <option value="">Escolher gênero</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>{genero.nome}</option>
              ))}
            </select>
          </section>

          <section className="form-card">
            <label>Diretor</label>
            <input name="diretor" value={form.diretor} onChange={handleChange} placeholder="Diretor do filme" />

            <label>Elenco</label>
            <textarea name="atores" value={form.atores} onChange={handleChange} placeholder="Ex: Ator 1, Ator 2, Ator 3" />
          </section>

          <section className="form-card">
            <label>Sinopse</label>
            <textarea name="sinopse" value={form.sinopse} onChange={handleChange} placeholder="Sinopse do filme" required />
          </section>

          <div className="form-actions">
            <button className="save-button" type="submit">
              {isAdmin ? <FiSave /> : <FiSend />}
              {isAdmin ? 'Salvar alterações' : 'Enviar solicitação'}
            </button>
          </div>
        </div>
      </form>

      {mostrarPopup && (
        <div className="poster-modal-overlay">
          <div className="poster-modal">
            <button type="button" className="poster-modal-close" onClick={() => setMostrarPopup(false)}>
              <FiX />
            </button>

            <h2>Adicionar poster</h2>

            <input
              type="text"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="Cole a URL da imagem do poster"
            />

            <div className="poster-modal-preview">
              {posterUrl ? <img src={posterUrl} alt="Prévia do poster" /> : <span>Prévia do poster</span>}
            </div>

            <button type="button" className="poster-confirm-button" onClick={confirmarPoster}>
              <FiCheck />
              Usar este poster
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdicionarFilme