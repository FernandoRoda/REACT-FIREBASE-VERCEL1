import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Login } from "./components/login"
import ListaDeTarefas from "./components/ListaDeTarefas"
import ProfilePage from "./components/Perfil"
import ListaDeProdutos from "./components/ListaDeProdutos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/cadastro" element={<Login />} />
        <Route path="/lista-tarefas" element={<ListaDeTarefas />} />
        <Route path="/lista-produtos" element={<ListaDeProdutos />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
