// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <header className="navbar">
      <div className="Secciones">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/">Estado #1</Link></li>
          <li><Link to="/">Estado #2</Link></li>
          <li><Link to="/">Estado #3</Link></li>
          <li><Link to="/">Estado #4</Link></li>
          <li><Link to="/">Estado #5</Link></li>
          
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
              <li style={{ float: 'right' }}>
                <Link to="/contacto">Contactanos</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;