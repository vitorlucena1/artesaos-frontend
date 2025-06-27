import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { api } from './api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'artesan' // valor padrão correto
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Debug: veja o que está sendo enviado
      // console.log('Enviando para API:', formData);

      const response = await api.register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required 
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required 
          />
        </div>
        <div>
          <label htmlFor="role">Perfil:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            required
          >
            <option value="artesan">Artesão</option>
            <option value="visitante">Visitante</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}

export default Register;