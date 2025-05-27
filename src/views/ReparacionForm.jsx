import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@mui/material/Input";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import SaveIcon from "@mui/icons-material/Save";

function ReparacionForm() {
  const [reparacion, setReparacion] = useState({});
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState({});
  const [ordenSeleccionada, setOrdenSeleccionada] = useState({});
  const [facturas, setFacturas] = useState([]);
  //cosas en pantalla
  const [banderaModalTecnico, setBanderaModalTecnico] = useState(false);
  const [banderaModalOrden, setBanderaModalOrden] = useState(false);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReparacion((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(name, value);
  };

  useEffect(() => {
    setCargando(true);

    // Consultas paralelas
    Promise.all([
      axios.get("http://localhost:3300/api/tecnicos/listar"),
      axios.get("http://localhost:3300/api/facturas/aprobadas"),
    ])
      .then(([tecnicosRes, facturasRes]) => {
        if (tecnicosRes.data.success) {
          setTecnicos(tecnicosRes.data.data);
        } else {
          setError("Error en respuesta de técnicos");
        }

        if (facturasRes.data.success) {
          setFacturas(facturasRes.data.data);
        } else {
          setError("Error en respuesta de facturas");
        }
      })
      .catch((error) => {
        setError("Error al consumir las APIs -> " + error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const limpiarFormulario = () => {
    setReparacion({});
    setTecnicoSeleccionado({});
    setOrdenSeleccionada({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones opcionales
    if (!tecnicoSeleccionado?.id || !ordenSeleccionada?.id_order) {
      alert(
        "Debe seleccionar un técnico y una orden antes de registrar la reparación."
      );
      return;
    }

    const nuevaReparacion = {
      ...reparacion,
      tecnicoId: tecnicoSeleccionado.id,
      ordenId: ordenSeleccionada.id_order,
    };

    axios
      .post("http://localhost:3300/api/reparaciones/crear", nuevaReparacion)
      .then((response) => {
        console.log("Reparación enviada:", response.data);
        alert("Reparación registrada con éxito");
        limpiarFormulario(); // Limpiar formulario al final
      })
      .catch((error) => {
        console.error("Error al registrar la reparación:", error);
        if (error.response) {
          console.error("Datos de respuesta:", error.response.data);
          console.error("Código de estado:", error.response.status);
        }
        alert("Error al enviar la reparación");
      });
  };

  if (cargando) return <CircularProgress />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Datos del Cliente</legend>
          <div className="form-group">
            <label htmlFor="cl_nombre">Nombres</label>
            <Input
              id="cl_nombre"
              name="cl_nombre"
              onChange={handleChange}
              placeholder="Ingrese los nombres del cliente"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="cl_cedula">Cédula</label>
            <Input
              id="cl_cedula"
              name="cl_cedula"
              onChange={handleChange}
              placeholder="Ingrese el número de cédula"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="cl_telefono">Teléfono</label>
            <Input
              id="cl_telefono"
              name="cl_telefono"
              onChange={handleChange}
              placeholder="Ingrese el número de teléfono"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="equipo">Equipo:</label>
            <Input
              id="equipo"
              name="equipo"
              onChange={handleChange}
              placeholder="Ingrese la marca y el modelo de su equipo"
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="problema">Problema reportado:</label>
            <Input
              id="problema"
              name="problema"
              onChange={handleChange}
              placeholder="Descripcion del problema"
              fullWidth
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Datos del Tecnico</legend>
          <div className="form-group">
            <label htmlFor="tecnicoId">Id del tecnico:</label>
            <Input
              id="tecnicoId"
              name="tecnicoId"
              value={tecnicoSeleccionado?.id || ""}
              fullWidth
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <Input
              id="nombre"
              name="nombre"
              disabled
              value={tecnicoSeleccionado?.nombre || ""}
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <Input
              id="cedula"
              name="cedula"
              disabled
              value={tecnicoSeleccionado?.cedula || ""}
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <Input
              id="telefono"
              value={tecnicoSeleccionado?.telefono || ""}
              name="telefono"
              disabled
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="especialidad">Especialidad</label>
            <Input
              id="especialidad"
              name="especialidad"
              disabled
              value={tecnicoSeleccionado?.especialidad || ""}
              fullWidth
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <Input
              id="estado"
              name="estado"
              disabled
              value={tecnicoSeleccionado?.estado || ""}
              fullWidth
            />
          </div>
        </fieldset>
        <Button
          onClick={() => {
            setBanderaModalTecnico(true);
          }}
          color="info"
          variant="contained"
          className="button"
        >
          Seleccionar tecnico
        </Button>
        <fieldset>
          <legend>Informacion de la orden relacionada</legend>
          <div className="form-group">
            <label htmlFor="ordenId">Id de la orden:</label>
            <Input
              id="ordenId"
              name="ordenId"
              value={ordenSeleccionada?.id_order || ""}
              fullWidth
              disabled
            />
          </div>
        </fieldset>
        <Button
          onClick={() => {
            setBanderaModalOrden(true);
          }}
          color="info"
          variant="contained"
          className="button"
        >
          Seleccionar orden relacionada
        </Button>
        <fieldset>
          <div className="form-group">
            <label htmlFor="fechaEntregaEst">Fecha de entrega estimada</label>
            <Input
              type="date"
              id="fechaEntregaEst"
              name="fechaEntregaEst"
              onChange={handleChange}
              fullWidth
            />
          </div>
        </fieldset>
        <Button
          color="success"
          variant="contained"
          className="button"
          endIcon={<SaveIcon />}
          type="submit"
        >
          Registrar Reparacion
        </Button>
      </form>

      <Modal
        open={banderaModalTecnico}
        onClose={() => {
          setBanderaModalTecnico(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={banderaModalTecnico}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 850,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione el tecnico
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: "blue" }}>
                  <TableRow>
                    <th style={{ color: "white" }}>ID</th>
                    <th style={{ color: "white" }}>Nombre</th>
                    <th style={{ color: "white" }}>Cedula</th>
                    <th style={{ color: "white" }}>Telefono</th>
                    <th style={{ color: "white" }}>Especialidad</th>
                    <th style={{ color: "white" }}>Estado</th>
                    <th style={{ color: "white" }}>Acciones</th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tecnicos.map((tec) => (
                    <TableRow key={tec.id}>
                      <TableCell>{tec.id}</TableCell>
                      <TableCell>{tec.nombre}</TableCell>
                      <TableCell>{tec.cedula}</TableCell>
                      <TableCell>{tec.telefono}</TableCell>
                      <TableCell>{tec.especialidad}</TableCell>
                      <TableCell>{tec.estado}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            setTecnicoSeleccionado(tec);
                            setBanderaModalTecnico(false);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Seleccionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={banderaModalOrden}
        onClose={() => {
          setBanderaModalOrden(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={banderaModalOrden}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 850,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione la orden relacionada
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2" }}>
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
                  {facturas.map((fct) => (
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
                        <Button
                          onClick={() => {
                            setOrdenSeleccionada(fct);
                            setBanderaModalOrden(false);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Seleccionar
                        </Button>
                      </TableCell>
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

export default ReparacionForm;
