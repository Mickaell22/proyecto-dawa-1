import React from "react";
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
  Circular,
  Progress,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function Facturas(props) {
  //Factura: id, cliente, fecha, valor, activa?, acciones
  //detallesFcatura: Nombre, Precio, Cantidad, Total
  const facturas = [
    {
      id: 1,
      cliente: "Marco",
      fecha: "17/05/2025",
      valor: 93.0,
      activa: true,
    },
    {
      id: 2,
      cliente: "Nahin",
      fecha: "16/05/2025",
      valor: 120.5,
      activa: false,
    },
    {
      id: 3,
      cliente: "Elias",
      fecha: "15/05/2025",
      valor: 75.2,
      activa: true,
    },
    {
      id: 4,
      cliente: "Kenny",
      fecha: "14/05/2025",
      valor: 210.0,
      activa: false,
    },
    {
      id: 5,
      cliente: "Anderson",
      fecha: "14/05/2025",
      valor: 56.5,
      activa: true,
    },
  ];

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
                <th style={{ color: "white" }}>Fecha</th>
                <th style={{ color: "white" }}>Valor</th>
                <th style={{ color: "white" }}>Activa</th>
                <th style={{ color: "white" }}>Acciones</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((fct) => (
                <TableRow key={fct.id}>
                  <TableCell align="center">{fct.id}</TableCell>
                  <TableCell align="center">{fct.cliente}</TableCell>
                  <TableCell align="center">{fct.fecha}</TableCell>
                  <TableCell align="center">{fct.valor}</TableCell>
                  <TableCell align="center">
                    {fct.activa ? "Si" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {/* <Link to={"/detalles"}> */}
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<DescriptionIcon />}
                    >
                      Ver detalles
                    </Button>
                  {/* </Link> */}
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
