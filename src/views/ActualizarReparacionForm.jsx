import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  Input,
  TableContainer,
  TableRow,
  Paper,
  Alert,
  Modal,
  Fade,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

function ActualizarReparacionForm() {
  const [reparacionSeleccionada, setReparacionSeleccionada] = useState();
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [banderaModal, setBanderaModal] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  const estadosReparacion = [
    "EN_PROCESO",
    "ESPERANDO_REPUESTO",
    "TERMINADO",
    "ENTREGADO",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/reparaciones")
      .then((response) => {
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

  useEffect(() => {
    if (reparacionSeleccionada) {
      setEstadoSeleccionado(reparacionSeleccionada.estado || "");
    }
  }, [reparacionSeleccionada]);

  const actualizarEstado = () => {
    axios
      .put(
        `http://localhost:3300/api/reparaciones/actualizar/${reparacionSeleccionada.id}`,
        { estado: estadoSeleccionado }
      )
      .then(() => {
        const reparacionesActualizadas = reparaciones.map((rep) =>
          rep.id === reparacionSeleccionada.id
            ? { ...rep, estado: estadoSeleccionado }
            : rep
        );
        setReparaciones(reparacionesActualizadas);
        setBanderaModal(false);
        alert("Se ha actualizado con exito");
      })
      .catch((err) => {
        alert("Error al actualizar el estado: " + err.message);
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Reparaciones disponibles
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "gray" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>ID Reparación</TableCell>
              <TableCell style={{ color: "white" }}>Nombre del Cliente</TableCell>
              <TableCell style={{ color: "white" }}>Cédula del Cliente</TableCell>
              <TableCell style={{ color: "white" }}>Teléfono del Cliente</TableCell>
              <TableCell style={{ color: "white" }}>Equipo</TableCell>
              <TableCell style={{ color: "white" }}>Problema Reportado</TableCell>
              <TableCell style={{ color: "white" }}>Fecha Ingreso</TableCell>
              <TableCell style={{ color: "white" }}>Estado</TableCell>
              <TableCell style={{ color: "white" }}>Técnico Asignado (ID)</TableCell>
              <TableCell style={{ color: "white" }}>Fecha Entrega Estimada</TableCell>
              <TableCell style={{ color: "white" }}>ID Orden</TableCell>
              <TableCell style={{ color: "white" }}>Acciones</TableCell>
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
                <TableCell align="center">{rep.ordenId}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setReparacionSeleccionada(rep);
                      setBanderaModal(true);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Cambiar estado
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={banderaModal}
        onClose={() => setBanderaModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={banderaModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              maxHeight: "80vh",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              overflowY: "auto",
            }}
          >
            <fieldset>
              <legend>Datos del Cliente</legend>
              <Input disabled fullWidth value={reparacionSeleccionada?.id || ""} />
              <Input disabled fullWidth value={reparacionSeleccionada?.clienteNombre || ""} />
              <Input disabled fullWidth value={reparacionSeleccionada?.clienteCedula || ""} />
              <Input disabled fullWidth value={reparacionSeleccionada?.clienteTelefono || ""} />
            </fieldset>

            <fieldset style={{ marginTop: "1rem" }}>
              <legend>Datos del Técnico</legend>
              <Input disabled fullWidth value={reparacionSeleccionada?.tecnicoId || ""} />
              <Input disabled fullWidth value={reparacionSeleccionada?.equipo || ""} />
              <Input disabled fullWidth value={reparacionSeleccionada?.problemaReportado || ""} />
            </fieldset>

            <FormControl fullWidth margin="normal">
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                value={estadoSeleccionado}
                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                label="Estado"
              >
                {estadosReparacion.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado.replace("_", " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={actualizarEstado} variant="contained" color="success">
                Guardar Estado
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ActualizarReparacionForm;
