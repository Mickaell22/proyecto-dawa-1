import axios from 'axios';

// url de api server
const API_URL = 'http://localhost:3300/api';

// axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// AUXILIAR
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

// funcion para logear
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    if (response.data.success) {
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

//cerrar Session
export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  return {
    success: true,
    message: 'Sesión cerrada correctamente'
  };
};

//usuario esta autenticado?
export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

//datos del usuario actual autenticado
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

//todos los usuarios
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

// AUXILIAR
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

export default {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
  getCurrentUser,
  getUsers,
  getUserById
};