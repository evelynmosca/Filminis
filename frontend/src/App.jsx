import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import GerenciarFilmes from './pages/GerenciarFilmes'
import DetalhesFilme from './pages/DetalhesFilme'
import AdicionarFilme from './pages/AdicionarFilme'
import EditarFilme from './pages/EditarFilme'
import SolicitacoesAdicao from './pages/SolicitacoesAdicao'
import SolicitacoesEdicao from './pages/SolicitacoesEdicao'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gerenciar"
          element={
            <ProtectedRoute>
              <GerenciarFilmes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/filmes/:id"
          element={
            <ProtectedRoute>
              <DetalhesFilme />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adicionar-filme"
          element={
            <ProtectedRoute>
              <AdicionarFilme />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editar-filme/:id"
          element={
            <ProtectedRoute>
              <EditarFilme />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solicitacoes/adicao"
          element={
            <AdminRoute>
              <SolicitacoesAdicao />
            </AdminRoute>
          }
        />

        <Route
          path="/solicitacoes/edicao"
          element={
            <AdminRoute>
              <SolicitacoesEdicao />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App