import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const DetallesFactura = () => {
  const { order_id } = useParams();

  const [detallesOrdenes, setDetallesOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();
  const url = `http://localhost:3300/api/facturas/${order_id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        if (response.data.success) {
          setDetallesOrdenes(response.data.data.detalles);
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

  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Detalles de la orden: {order_id}
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "darkcyan" }}>
            <TableRow>
              <th style={{ color: "white" }}>ID</th>
              <th style={{ color: "white" }}>ID de la orden</th>
              <th style={{ color: "white" }}>ID del respuesto</th>
              <th style={{ color: "white" }}>Precio Unitario</th>
              <th style={{ color: "white" }}>Nombre del producto</th>
              <th style={{ color: "white" }}>Cantidad</th>
              <th style={{ color: "white" }}>Total</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {detallesOrdenes.map((details) => (
              <TableRow key={details.id_order}>
                <TableCell align="center">{details.id}</TableCell>
                <TableCell align="center">{details.ordenId}</TableCell>
                <TableCell align="center">{details.repuestoId}</TableCell>
                <TableCell align="center">{details.precioUnitario}</TableCell>
                <TableCell align="center">{details.nombreProducto}</TableCell>
                <TableCell align="center">{details.cantidad}</TableCell>
                <TableCell align="center">{details.montoTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetallesFactura;
