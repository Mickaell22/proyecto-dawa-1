import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <header className="navbar">
      <div className="Secciones">
        <ul>
          <li><Link to="/">Inicio Inicio</Link></li>
          <li><Link to="/busqueda">Estado #1</Link></li>
          <li><Link to="/pedagogico">Estado #2</Link></li>
          <li><Link to="/terapeutico">Estado #3</Link></li>
          <li><Link to="/informe">Estado #4</Link></li>
          <li><Link to="/estado">Estado #5</Link></li>
          
          {isLoggedIn ? (
            <li style={{ float: 'right' }}>
              <Link to="/logout">Cerrar Sesión</Link>
            </li>
          ) : (
            <li style={{ float: 'right' }}>
              <Link to="/contacto">Contactanos</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;