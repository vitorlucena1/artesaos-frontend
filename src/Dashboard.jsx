import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './api';

function Dashboard() {
  const { user, token, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts(token); // Passe o token aqui
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.createProduct({
        ...newProduct,
        price: parseFloat(newProduct.price)
      }, token, user._id);
      setNewProduct({ name: '', description: '', price: '', category: '' });
      setShowCreateForm(false);
      loadProducts();
    } catch (err) {
      setError('Erro ao criar produto');
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bem-vindo, {user?.name}!</h1>
        <button onClick={logout} className="logout-btn">Sair</button>
      </div>

      <div className="dashboard-content">
        <div className="products-section">
          <div className="section-header">
            <h2>Meus Produtos</h2>
            <button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="create-btn"
            >
              {showCreateForm ? 'Cancelar' : 'Novo Produto'}
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreateProduct} className="create-form">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Categoria"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Descrição do produto"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
              <div className="form-row">
                <input
                  type="number"
                  name="price"
                  placeholder="Preço"
                  step="0.01"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Criar Produto</button>
              </div>
            </form>
          )}

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Carregando produtos...</div>
          ) : (
            <div className="products-grid">
              {products.length === 0 ? (
                <div className="empty-state">
                  <p>Você ainda não tem produtos cadastrados.</p>
                  <p>Clique em "Novo Produto" para começar!</p>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product._id} className="product-card">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">R$ {product.price.toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

