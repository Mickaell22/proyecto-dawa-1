import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../controllers/frontController';

const Navbar = ({ isLoggedIn }) => {
  const currentUser = getCurrentUser();
  
  return (
    <header className="navbar">
      <div className="Secciones">
        <ul>
          {/* Publico */}
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/diagnostico">Diagnóstico</Link></li>
          
          {/* Repuesto visible solo para logeados */}
          {isLoggedIn && (
            <li><Link to="/repuestos">Repuestos</Link></li>
          )}
          
          {/* Facturacion y libre */}
          <li><Link to="/factura">Factura</Link></li>
          <li><Link to="/libre5">Libre 5</Link></li>
          
          {/* Opciones de autenticación */}
          {isLoggedIn ? (
            <li style={{ float: 'right' }}>
              <Link to="/logout">Cerrar Sesión</Link>
            </li>
          ) : (
            <>
              <li style={{ float: 'right' }}>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li style={{ float: 'right' }}>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )}
          
        </ul>
      </div>
    </header>
  );
};

export default Navbar;