import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BuildIcon from "@mui/icons-material/Build";
import HandymanIcon from "@mui/icons-material/Handyman";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import "../assets/css/estilos-troya.css";

const MenuReparaciones = () => {
  return (
    <div className="submenu-container">
      <div>
        <h4>Consultas del Cliente</h4>
        <div className="submenu-buttons-row">
          <Link to={"/reparaciones/cliente"}>
            <Button
              variant="contained"
              size="large"
              className="submenu-button"
              startIcon={<FingerprintIcon />}
              sx={{
                backgroundColor: "#00695c",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#004d40",
                },
              }}
            >
              Buscar reparacion por cedula
            </Button>
          </Link>
          <Link to={"/reparacion"}>
            <Button
              variant="contained"
              size="large"
              className="submenu-button"
              startIcon={<BuildIcon />}
              sx={{
                backgroundColor: "#f57c00",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#bb4d00",
                },
              }}
            >
              Buscar reparacion por Id
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <h4>Consultas del Admin</h4>
        <div className="submenu-buttons-row">
          <Link to={"/reparaciones/todas"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "gray",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#1b1b1b",
                },
              }}
              size="large"
              className="submenu-button"
              startIcon={<ReceiptLongIcon />}
            >
              Obtener todas las reparaciones
            </Button>
          </Link>
          <Link to={"/reparaciones/empleado"}>
            <Button
              variant="contained"
              color="info"
              size="large"
              className="submenu-button"
              startIcon={<BadgeIcon />}
            >
              Buscar reparacion por Empleado
            </Button>
          </Link>
          <Link to={"/reparaciones/crear"}>
            <Button
              variant="contained"
              color="success"
              size="large"
              className="submenu-button"
              startIcon={<HandymanIcon />}
            >
              Registrar una reparacion
            </Button>
          </Link>
          <Link to={"/reparaciones/actualizar"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fbc02d",
                "&:hover": {
                  backgroundColor: "#f9a825",
                },
              }}
              size="large"
              className="submenu-button"
              startIcon={<ChangeCircleIcon />}
            >
              Cambiar estado de reparacion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuReparaciones;