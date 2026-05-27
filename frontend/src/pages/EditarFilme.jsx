import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  FiSave,
  FiTrash2,
  FiSend,
  FiArrowLeft
} from 'react-icons/fi'
import Header from '../components/Header'
import api from '../services/api'
import '../styles/filmeForm.css'

function EditarFilme() {
  const { id } = useParams()
  const navigate = useNavigate()

  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  const [generos, setGeneros] = useState([])
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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function carregarDados() {
    try {
      const [filmeResponse, generosResponse] = await Promise.all([
        api.get(`filmes/${id}/`),
        api.get('generos/')
      ])

      const filme = filmeResponse.data

      setGeneros(generosResponse.data)

      setForm({
        titulo: filme.titulo || '',
        ano: filme.ano || '',
        duracao: filme.duracao || '',
        linguagem: filme.linguagem_nome || '',
        produtora: filme.produtora_nome || '',
        genero: filme.genero || '',
        diretor: filme.diretor_nome || '',
        atores: filme.atores_nomes?.join(', ') || '',
        sinopse: filme.sinopse || '',
        poster: filme.poster || '',
        orcamento: filme.orcamento || '',
        pais: filme.pais_nome || ''
      })
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

    if (itemExistente) {
      return itemExistente.id
    }

    const novoItem = await api.post(endpoint, { nome })
    return novoItem.data.id
  }

  async function prepararDados() {
    const generoId = form.genero
    const diretorId = await buscarOuCriar('diretores/', form.diretor)
    const produtoraId = await buscarOuCriar('produtoras/', form.produtora)
    const paisId = await buscarOuCriar('paises/', form.pais)
    const linguagemId = await buscarOuCriar('linguagens/', form.linguagem)

    const nomesAtores = form.atores
      .split(',')
      .map((ator) => ator.trim())
      .filter(Boolean)

    const atoresIds = []

    for (const nome of nomesAtores) {
      const atorId = await buscarOuCriar('atores/', nome)
      if (atorId) atoresIds.push(atorId)
    }

    return {
      titulo: form.titulo,
      ano: Number(form.ano),
      duracao: form.duracao,
      sinopse: form.sinopse,
      poster: form.poster,
      orcamento: form.orcamento || null,
      genero: generoId,
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

      await api.put(`filmes/${id}/`, dados)

      if (isAdmin) {
        alert('Filme atualizado com sucesso!')
      } else {
        alert('Solicitação de edição enviada para aprovação!')
      }

      navigate('/gerenciar')
    } catch (error) {
      console.log(error)
      alert('Erro ao salvar alterações.')
    }
  }

  async function excluirFilme() {
    const confirmar = window.confirm('Deseja realmente excluir este filme?')

    if (!confirmar) return

    try {
      await api.delete(`filmes/${id}/`)
      alert('Filme excluído com sucesso!')
      navigate('/gerenciar')
    } catch (error) {
      console.log(error)
      alert('Erro ao excluir filme.')
    }
  }

  useEffect(() => {
    carregarDados()
  }, [id])

  function formatarDuracao(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 4)

    if (numeros.length <= 2) {
      return numeros
    }

    const horas = numeros.slice(0, 2)
    const minutos = numeros.slice(2, 4)

    return `${horas}:${minutos}:00`
  }

  function formatarOrcamento(valor) {
    const numeros = valor.replace(/\D/g, '')

    if (!numeros) return ''

    return Number(numeros).toLocaleString('pt-BR')
  }

  return (
    <div className="filme-form-page">
      <Header />

      <div className="filme-form-top">
        <div className="form-title-area">
          <button
            className="back-button"
            onClick={() => navigate('/gerenciar')}
            type="button"
          >
            <FiArrowLeft />
          </button>

          <h1>GERENCIAR INFORMAÇÕES DO FILME</h1>
        </div>

        <button
          className="form-top-button"
          onClick={() => navigate('/adicionar-filme')}
        >
          {isAdmin ? '+ Adicionar Filme' : '+ Solicitar Adição'}
        </button>
      </div>

      <form className="filme-form" onSubmit={salvar}>
        <section className="form-card">
          <label>Título</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Nome do filme"
          />

          <div className="form-grid">
            <div>
              <label>Ano</label>
              <input
                name="ano"
                value={form.ano}
                onChange={handleChange}
                placeholder="2008"
              />
            </div>

            <div>
              <label>Duração</label>
              <input
                name="duracao"
                value={form.duracao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duracao: formatarDuracao(e.target.value)
                  })
                }
                placeholder="01:40:00"
              />
            </div>

            <div>
              <label>Idioma</label>
              <input
                name="linguagem"
                value={form.linguagem}
                onChange={handleChange}
                placeholder="Inglês"
              />
            </div>

            <div>
              <label>Produtora</label>
              <input
                name="produtora"
                value={form.produtora}
                onChange={handleChange}
                placeholder="Warner"
              />
            </div>
          </div>
        </section>

        <section className="form-card">
          <label>Gênero</label>
          <select name="genero" value={form.genero} onChange={handleChange}>
            <option value="">Escolher gênero</option>

            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </section>

        <section className="form-card">
          <label>Diretor</label>
          <input
            name="diretor"
            value={form.diretor}
            onChange={handleChange}
            placeholder="Diretor do filme"
          />

          <label>Elenco</label>
          <textarea
            name="atores"
            value={form.atores}
            onChange={handleChange}
            placeholder="Ex: Ator 1, Ator 2, Ator 3"
          />

          <label>Orçamento</label>
          <input
            name="orcamento"
            value={form.orcamento}
            onChange={(e) =>
              setForm({
                ...form,
                orcamento: formatarOrcamento(e.target.value)
              })
            }
            placeholder="Ex: 260000000"
          />

          <label>País</label>
          <input
            name="pais"
            value={form.pais}
            onChange={handleChange}
            placeholder="País do filme"
          />

          <label>URL do Poster</label>
          <input
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="URL do poster"
          />
        </section>

        <section className="form-card">
          <label>Sinopse</label>
          <textarea
            name="sinopse"
            value={form.sinopse}
            onChange={handleChange}
            placeholder="Sinopse do filme"
          />
        </section>

        <div className="form-actions">
          <button className="save-button" type="submit">
            {isAdmin ? <FiSave /> : <FiSend />}
            {isAdmin ? 'Salvar alterações' : 'Enviar solicitação'}
          </button>

          {isAdmin && (
            <button
              type="button"
              className="remove-button"
              onClick={excluirFilme}
            >
              <FiTrash2 />
              Excluir filme
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditarFilme