import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'
import './App.css'

function Home() {
  return (
    <section>
      <h2>Produtos em destaque</h2>
      {/* Aqui futuramente listaremos os produtos */}
    </section>
  )
}

function App() {
  return (
    <div className="container">
      <header>
        <h1>Artesãos Marketplace</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 Artesãos Marketplace</p>
      </footer>
    </div>
  )
}

export default App
