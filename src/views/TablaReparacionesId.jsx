//hola
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import axios from "axios";
import {
  Modal,
  Button,
  Typography,
  Fade,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
} from "@mui/material";
import "../assets/css/estilos-troya.css";

function TablaReparacionesId() {
  const [cajaBusqueda, setCajaBusqueda] = useState({ id: "" });
  const [datos, setDatos] = useState(null);
  const [banderaDatos, setBanderaDatos] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCajaBusqueda((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3300/api/reparaciones/${cajaBusqueda.id}`)
      .then((response) => {
        console.log("Datos de la reparación:", response.data);
        setDatos(response.data.data);
        setBanderaDatos(true);
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
        alert("Error al buscar la reparación");
      });
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="busqueda-container">
            <label htmlFor="id">ID:</label>
            <Input
              id="id"
              name="id"
              onChange={handleChange}
              placeholder="Ingrese id de su reparacion para realizar la busqueda"
              sx={{ width: "500px" }}
            />
            <Button
              variant="contained"
              color="info"
              size="small"
              type="submit"
              endIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </div>
        </form>
      </div>

      <Modal
        open={banderaDatos}
        onClose={() => setBanderaDatos(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={banderaDatos}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Detalle de la reparación
            </Typography>
            {datos ? (
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead sx={{ backgroundColor: "gray" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>Campo</TableCell>
                      <TableCell style={{ color: "white" }}>Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>ID Reparación</TableCell>
                      <TableCell>{datos.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nombre del Cliente</TableCell>
                      <TableCell>{datos.clienteNombre}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cédula del Cliente</TableCell>
                      <TableCell>{datos.clienteCedula}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Teléfono del Cliente</TableCell>
                      <TableCell>{datos.clienteTelefono}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Equipo</TableCell>
                      <TableCell>{datos.equipo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Problema Reportado</TableCell>
                      <TableCell>{datos.problemaReportado}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fecha Ingreso</TableCell>
                      <TableCell>{datos.fechaIngreso}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Estado</TableCell>
                      <TableCell>{datos.estado}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Técnico Asignado (ID)</TableCell>
                      <TableCell>{datos.tecnicoId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fecha Entrega Estimada</TableCell>
                      <TableCell>{datos.fechaEntregaEstimada}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fecha Entrega Real</TableCell>
                      <TableCell>{datos.fechaEntregaReal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ID Orden</TableCell>
                      <TableCell>{datos.ordenId}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No se encontraron datos</Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TablaReparacionesId;
