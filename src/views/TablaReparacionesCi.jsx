import React, { useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import axios from "axios";
import {
  Modal,
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

function TablaReparacionesCi(props) {
  const [cajaBusqueda, setCajaBusqueda] = useState({ ci: "" });
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
      .get(`http://localhost:3300/api/reparaciones/cliente/${cajaBusqueda.ci}`)
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setDatos(response.data);
        setBanderaDatos(true);
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
        alert("Error al buscar reparaciones por cédula");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ci">CI:</label>
          <Input
            id="ci"
            name="ci"
            onChange={handleChange}
            placeholder="Ingrese su número de cédula para realizar la búsqueda"
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
              Reparaciones del Cliente
            </Typography>
            {datos.length > 0 ? (
              <TableContainer component={Paper} elevation={3}>
                <Table>
                  <TableHead sx={{ backgroundColor: "gray" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>ID</TableCell>
                      <TableCell style={{ color: "white" }}>Equipo</TableCell>
                      <TableCell style={{ color: "white" }}>Problema</TableCell>
                      <TableCell style={{ color: "white" }}>Estado</TableCell>
                      <TableCell style={{ color: "white" }}>
                        Fecha Ingreso
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datos.map((reparacion) => (
                      <TableRow key={reparacion.id}>
                        <TableCell>{reparacion.id}</TableCell>
                        <TableCell>{reparacion.equipo}</TableCell>
                        <TableCell>{reparacion.problemaReportado}</TableCell>
                        <TableCell>{reparacion.estado}</TableCell>
                        <TableCell>{reparacion.fechaIngreso}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>
                No se encontraron reparaciones para esta cédula.
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TablaReparacionesCi;