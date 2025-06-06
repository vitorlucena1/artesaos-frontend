import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>Artesãos Marketplace</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Produtos</a>
          <a href="#">Sobre</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Produtos em destaque</h2>
          {/* Aqui futuramente listaremos os produtos */}
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Artesãos Marketplace</p>
      </footer>
    </div>
  )
}

export default App
