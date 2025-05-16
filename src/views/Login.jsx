// src/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../controllers/frontController';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.email || !formData.password) {
      setError('Email y contraseña son obligatorios');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Enviar datos al API
      const result = await loginUser(formData);
      
      if (result.success) {
        // Redireccionar al inicio
        navigate('/');
        // Forzar recarga para actualizar la barra de navegación
        window.location.reload();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Iniciar Sesión</h2>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese su email"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;