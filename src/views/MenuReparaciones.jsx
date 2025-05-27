import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BuildIcon from '@mui/icons-material/Build';
import HandymanIcon from '@mui/icons-material/Handyman';
import BadgeIcon from '@mui/icons-material/Badge';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const MenuReparaciones = () => {
//   repacionesRoutes.get("/reparaciones/cliente/:ci", getRepacionesPorCI);
//   repacionesRoutes.get(
//     "/reparaciones/empleado/:id_empleado",
//     getRepacionesPorEmpleadoId
//   );
//   repacionesRoutes.get("/reparaciones/:id", getReparacionPorId);
//   repacionesRoutes.post("/reparaciones/crear", crearReparacion);
//   repacionesRoutes.put(
//     "/reparaciones/actualizar/:id",
//     actualizarEstadoReparacion
//   );

  return (
    <div className="submenu-container">
      <div>
        <h4>Consultas del Cliente</h4>
        <Link to={"/reparaciones/cliente"}>
          <Button
            variant="contained"
            color="info"
            size="large"
            className="submenu-button"
            startIcon={<FingerprintIcon />}
          >
            Buscar reparacion por cedula
          </Button>
        </Link>
        <Link to={"/reparacion"}>
          <Button
            variant="contained"
            color="info"
            size="large"
            className="submenu-button"
            startIcon={<BuildIcon />}
          >
            Buscar reparacion por Id
          </Button>
        </Link>
      </div>
      <div>
        <h4>Consultas del Admin</h4>
        <Link to={"/reparaciones/todas"}>
          <Button
            variant="contained"
            color="info"
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
            color="info"
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
            color="info"
            size="large"
            className="submenu-button"
            startIcon={<ChangeCircleIcon />}
          >
            Cambiar estado de reparacion
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MenuReparaciones;
