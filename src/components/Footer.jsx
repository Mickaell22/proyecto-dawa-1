import React from 'react';

const Footer = () => {
  return (
    <footer className="pie">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>+365 0983777036</p>
          <p>mickaelmoranver.@ug.edu.ec</p>
        </div>

        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/mickael.moranvera" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.youtube.com/channel/UCk1Fy0DXDryNcILKx5irmXQ" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://github.com/Mickaell22" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/mickaell-moran-vera-ba421a2a3/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Participantes</h4>
          <div className="participantes">
            <p>Moran Vera Mickaell Adrian</p>
            <p>Salazar Mejia Marco Antonio</p>
            <p>Troya Garzon Geancarlos</p>
            <p>Malave Soriano Kristy Nicole</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;