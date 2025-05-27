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

function TablaReparaciones() {
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/reparaciones")
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        if (response.data.success) {
          setReparaciones(response.data.data);
        } else {
          setError("Error en respuesta del API");
        }
      })
      .catch((error) => {
        setError("Error al consumir el API -> " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Todas las reparaciones
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "gray" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>ID Reparación</TableCell>
              <TableCell style={{ color: "white" }}>
                Nombre del Cliente
              </TableCell>
              <TableCell style={{ color: "white" }}>
                Cédula del Cliente
              </TableCell>
              <TableCell style={{ color: "white" }}>
                Teléfono del Cliente
              </TableCell>
              <TableCell style={{ color: "white" }}>Equipo</TableCell>
              <TableCell style={{ color: "white" }}>
                Problema Reportado
              </TableCell>
              <TableCell style={{ color: "white" }}>Fecha Ingreso</TableCell>
              <TableCell style={{ color: "white" }}>Estado</TableCell>
              <TableCell style={{ color: "white" }}>
                Técnico Asignado (ID)
              </TableCell>
              <TableCell style={{ color: "white" }}>
                Fecha Entrega Estimada
              </TableCell>
              <TableCell style={{ color: "white" }}>
                Fecha Entrega Real
              </TableCell>
              <TableCell style={{ color: "white" }}>ID Orden</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reparaciones.map((rep) => (
              <TableRow key={rep.id}>
                <TableCell align="center">{rep.id}</TableCell>
                <TableCell align="center">{rep.clienteNombre}</TableCell>
                <TableCell align="center">{rep.clienteCedula}</TableCell>
                <TableCell align="center">{rep.clienteTelefono}</TableCell>
                <TableCell align="center">{rep.equipo}</TableCell>
                <TableCell align="center">{rep.problemaReportado}</TableCell>
                <TableCell align="center">{rep.fechaIngreso}</TableCell>
                <TableCell align="center">{rep.estado}</TableCell>
                <TableCell align="center">{rep.tecnicoId}</TableCell>
                <TableCell align="center">{rep.fechaEntregaEstimada}</TableCell>
                <TableCell align="center">{rep.fechaEntregaReal}</TableCell>
                <TableCell align="center">{rep.ordenId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TablaReparaciones;
