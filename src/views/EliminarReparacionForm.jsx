import React, { useState, useEffect } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Paper, TableContainer, Typography, CircularProgress, Alert
} from "@mui/material";
import axios from "axios";

const EliminarReparacion = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get("http://localhost:3300/api/reparaciones")
      .then((response) => {
        if (response.data.success) {
          setReparaciones(response.data.data);
        } else {
          setError("Error en respuesta del API");
        }
      })
      .catch((error) => setError("Error al cargar datos: " + error.message))
      .finally(() => setLoading(false));
  }, []);

  const eliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta reparación?")) {
      axios.delete(`http://localhost:3300/api/reparaciones/${id}`)
        .then(() => {
          setReparaciones(reparaciones.filter((r) => r.id !== id));
          alert("Reparación eliminada correctamente.");
        })
        .catch((err) => alert("Error al eliminar: " + err.message));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5">Eliminar Reparaciones</Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "gray" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>ID</TableCell>
              <TableCell style={{ color: "white" }}>Cliente</TableCell>
              <TableCell style={{ color: "white" }}>Equipo</TableCell>
              <TableCell style={{ color: "white" }}>Estado</TableCell>
              <TableCell style={{ color: "white" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reparaciones.map((rep) => (
              <TableRow key={rep.id}>
                <TableCell>{rep.id}</TableCell>
                <TableCell>{rep.clienteNombre}</TableCell>
                <TableCell>{rep.equipo}</TableCell>
                <TableCell>{rep.estado}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => eliminar(rep.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EliminarReparacion;
