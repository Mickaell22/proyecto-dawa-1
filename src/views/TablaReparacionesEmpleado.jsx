//hola
import React, { useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Modal,
  Typography,
  Fade,
  Box,
  Input,
} from "@mui/material";
import axios from "axios";
import "../assets/css/estilos-troya.css";

function TablaReparacionesEmpleado() {
  const [cajaBusqueda, setCajaBusqueda] = useState({ id_empleado: "" });
  const [datos, setDatos] = useState([]);
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
      .get(
        `http://localhost:3300/api/reparaciones/empleado/${cajaBusqueda.id_empleado}`
      )
      .then((response) => {
        console.log("Id empleado:", response.data);

        if (Array.isArray(response.data)) {
          setDatos(response.data);
          setBanderaDatos(true);
        } else if (Array.isArray(response.data.data)) {
          setDatos(response.data.data);
          setBanderaDatos(true);
        } else {
          alert("La respuesta no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
        if (error.response) {
          console.error("Datos de respuesta:", error.response.data);
          console.error("Código de estado:", error.response.status);
        }
        alert("Error al enviar los datos");
      });
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="busqueda-container">
            <label htmlFor="id_empleado">ID:</label>
            <Input
              id="id_empleado"
              name="id_empleado"
              onChange={handleChange}
              sx={{ width: "500px" }}
              placeholder="Ingrese el id del empleado para realizar la búsqueda"
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
              Reparaciones del empleado
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: "gray" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>
                      ID Reparación
                    </TableCell>
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
                    <TableCell style={{ color: "white" }}>
                      Fecha Ingreso
                    </TableCell>
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
                  {Array.isArray(datos) &&
                    datos.map((rep, index) => (
                      <TableRow key={rep.id || index}>
                        <TableCell align="center">{rep.id}</TableCell>
                        <TableCell align="center">
                          {rep.clienteNombre}
                        </TableCell>
                        <TableCell align="center">
                          {rep.clienteCedula}
                        </TableCell>
                        <TableCell align="center">
                          {rep.clienteTelefono}
                        </TableCell>
                        <TableCell align="center">{rep.equipo}</TableCell>
                        <TableCell align="center">
                          {rep.problemaReportado}
                        </TableCell>
                        <TableCell align="center">{rep.fechaIngreso}</TableCell>
                        <TableCell align="center">{rep.estado}</TableCell>
                        <TableCell align="center">{rep.tecnicoId}</TableCell>
                        <TableCell align="center">
                          {rep.fechaEntregaEstimada}
                        </TableCell>
                        <TableCell align="center">
                          {rep.fechaEntregaReal || "Sin entregar"}
                        </TableCell>
                        <TableCell align="center">{rep.ordenId}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TablaReparacionesEmpleado;
