// src/controllers/frontController.js
import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3300/api';

// Instancia de axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al registrar usuario'
    };
  }
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    if (response.data.success) {
      // Guardar información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al iniciar sesión'
    };
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  return {
    success: true,
    message: 'Sesión cerrada correctamente'
  };
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Función para obtener datos del usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al obtener usuarios'
    };
  }
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al obtener usuario'
    };
  }
};

// Exportamos todas las funciones como un objeto
export default {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
  getCurrentUser,
  getUsers,
  getUserById
};