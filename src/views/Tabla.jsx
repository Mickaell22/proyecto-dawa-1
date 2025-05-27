import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function Facturas() {
  //Factura: id, cliente, fecha, valor, activa?, acciones
  //detallesFcatura: Nombre, Precio, Cantidad, Total

  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();
  const url = "http://localhost:3300/api/facturas";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        if (response.data.success) {
          setOrdenes(response.data.data);
        } else {
          setError("Error en respuesta del API");
        }
      })
      .catch((error) => {
        setError("Error al consumir el API -> " + error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) return <CircularProgress />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Facturas del cliente
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "darkcyan" }}>
            <TableRow>
              <th style={{ color: "white" }}>ID</th>
              <th style={{ color: "white" }}>Cliente</th>
              <th style={{ color: "white" }}>Cedula de Cliente</th>
              <th style={{ color: "white" }}>Fecha</th>
              <th style={{ color: "white" }}>Total</th>
              <th style={{ color: "white" }}>Aprobada</th>
              <th style={{ color: "white" }}>Acciones</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((fct) => (
              <TableRow key={fct.id_order}>
                <TableCell align="center">{fct.id_order}</TableCell>
                <TableCell align="center">{fct.cl_nombre}</TableCell>
                <TableCell align="center">{fct.cl_cedula}</TableCell>
                <TableCell align="center">{fct.emitida}</TableCell>
                <TableCell align="center">{fct.total}</TableCell>
                <TableCell align="center">
                  {fct.aprobado ? "Si" : "No"}
                </TableCell>
                <TableCell align="center">
                  <Link to={`/detalles/${fct.id_order}`}>
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<DescriptionIcon />}
                    >
                      Ver detalles
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Facturas;
