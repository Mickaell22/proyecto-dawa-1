import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import "../assets/css/styles.css";

const SubMenuFacturas = () => {
  return (
    <div className="submenu-container">
      <Link to={`/facturas`}>
        <Button
          variant="contained"
          color="info"
          size="large"
          className="submenu-button"
          startIcon={<ReceiptLongIcon />}
        >
          Listado de Órdenes
        </Button>
      </Link>
      <Link to={`/facturas/no-aprobadas`}>
        <Button
          variant="contained"
          color="warning"
          size="large"
          className="submenu-button"
          startIcon={<UnpublishedIcon sx={{fontSize: 48}}/>}
        >
          Órdenes sin aprobar
        </Button>
      </Link>
      <Link to={`/factura/crear`}>
        <Button
          variant="contained"
          color="success"
          size="large"
          className="submenu-button"
          startIcon={<DescriptionIcon />}
        >
          Crear una orden
        </Button>
      </Link>
    </div>
  );
};

export default SubMenuFacturas;
