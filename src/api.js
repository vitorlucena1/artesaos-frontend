const API_BASE_URL = 'https://artesaos-backend-mongodb.vercel.app';

export const api = {
  // Funções de autenticação
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro no login');
    }
    
    return response.json();
  },

  register: async (name, email, password, role) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro no registro');
    }
    
    return response.json();
  },

  // Funções de produtos
  getProducts: async (token) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    return response.json();
  },

  createProduct: async (productData, token, userId) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...productData,
        artisanId: userId
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar produto');
    }
    
    return response.json();
  },

  deleteProduct: async (productId, token) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao deletar produto');
    }
    return response.json();
  },
};

// Função para carregar produtos
const loadProducts = async () => {
  try {
    const data = await api.getProducts(); // Não envia token
    setProducts(data);
  } catch (err) {
    setError('Erro ao carregar produtos');
  } finally {
    setLoading(false);
  }
};

// Função para criar produto
const handleCreateProduct = async (e) => {
  e.preventDefault();
  try {
    await api.createProduct({
      ...newProduct,
      price: parseFloat(newProduct.price)
    }, token, user._id); // Envia token e user._id
    setNewProduct({ name: '', description: '', price: '', category: '' });
    setShowCreateForm(false);
    loadProducts();
  } catch (err) {
    setError('Erro ao criar produto');
  }
};

