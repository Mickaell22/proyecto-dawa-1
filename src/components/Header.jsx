import React from "react";

const Header = ({ title = "Aplicación de telefonos" }) => {
  return (
    <div className="box_presentacion">
      <div className="box_presentacion_opaco">
        <h1 className="titulo">{title}</h1>
      </div>
    </div>
  );
};

export default Header;