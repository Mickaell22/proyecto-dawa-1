import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <header className="navbar">
      <div className="Secciones">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/busqueda">Busqueda y registro</Link></li>
          <li><Link to="/pedagogico">Pedagógico</Link></li>
          <li><Link to="/terapeutico">Terapéutico</Link></li>
          <li><Link to="/informe">Informe</Link></li>
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