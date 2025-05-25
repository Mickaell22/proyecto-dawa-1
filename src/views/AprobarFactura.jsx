import React, { useState, useEffect, use } from "react";
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
import TaskIcon from "@mui/icons-material/Task";
import axios from "axios";

const AprobarFactura = () => {
  const url = "http://localhost:3300/api/facturas/default";
  const [ordenesSinAprobar, setOrdenesSinAprobar] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = () => {
    setCargando(true);
    axios
      .get(url)
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        if (response.data.success) {
          setOrdenesSinAprobar(response.data.data);
          setError(null);
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
  };

  const aprobar = (id) => {
    //me tumba el mysql si intento aprobar una factura ya aprobada
    console.log("Enviando id de factura:", id);
    axios
      .put(`http://localhost:3300/api/facturas/aprobar/${id}`)
      .then((response) => {
        console.log("Factura aprobada:", response.data);
        alert("Factura aprobada con éxito");
        fetchFacturas(); //recargar pagina y que asi no se pueda tumbar el servidor
      })
      .catch((error) => {
        console.error("Error al aprobar la factura:", error);
        if (error.response) {
          console.error("Datos de respuesta:", error.response.data);
          console.error("Código de estado:", error.response.status);
        }
        alert("Error al enviar la factura");
      });
  };

  if (cargando) return <CircularProgress />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Facturas sin aprobar
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
            {ordenesSinAprobar.map((fct) => (
              <TableRow key={fct.id_order}>
                <TableCell align="center">{fct.id_order}</TableCell>
                <TableCell align="center">{fct.cl_cedula}</TableCell>
                <TableCell align="center">{fct.cl_nombre}</TableCell>
                <TableCell align="center">{fct.emitida}</TableCell>
                <TableCell align="center">{fct.total}</TableCell>
                <TableCell align="center">
                  {fct.aprobado ? "Si" : "No"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    className="button"
                    endIcon={<TaskIcon />}
                    type="button"
                    onClick={() => {
                      aprobar(fct.id_order);
                    }}
                  >
                    Aprobar
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

export default AprobarFactura;
