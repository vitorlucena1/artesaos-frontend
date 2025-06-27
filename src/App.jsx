import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'
import './App.css'

function Home() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="home">
      <div className="hero">
        <h2>Marketplace de Artesãos</h2>
        <p>Conecte-se com artesãos talentosos e descubra produtos únicos feitos à mão.</p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">Começar Agora</Link>
          <Link to="/login" className="btn btn-secondary">Já tenho conta</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>🎨 Produtos Únicos</h3>
          <p>Descubra peças exclusivas criadas por artesãos talentosos</p>
        </div>
        <div className="feature">
          <h3>🤝 Conecte-se</h3>
          <p>Conheça os artistas por trás das criações</p>
        </div>
        <div className="feature">
          <h3>💎 Qualidade</h3>
          <p>Produtos feitos com amor e atenção aos detalhes</p>
        </div>
      </div>
    </section>
  )
}

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav>
      <Link to="/" className="logo">Artesãos</Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="user-name">Olá, {user?.name}</span>
            <button onClick={logout} className="logout-link">Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  return (
    <div className="container">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 Artesãos Marketplace</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
