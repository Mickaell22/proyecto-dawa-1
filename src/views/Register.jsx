// src/views/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../controllers/frontController';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Preparar datos para enviar al API
      const userData = {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password
      };
      
      // Enviar datos al API
      const result = await registerUser(userData);
      
      if (result.success) {
        setSuccess('Usuario registrado correctamente');
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redireccionar al login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="register-container">
      <div className="login-header">
        <h2>Registro de Usuario</h2>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            disabled={loading}
          />
        </div>
        
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
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme su contraseña"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;