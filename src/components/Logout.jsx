import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../controllers/frontController';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Cerrar sesión
    logoutUser();
    // Redireccionar al inicio
    navigate('/');
    // Forzar recarga para actualizar la barra de navegación
    window.location.reload();
  }, [navigate]);
  
  return null;
};

export default Logout;