import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@mui/material/Input";
import DeleteIcon from "@mui/icons-material/Delete";
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
import SendIcon from "@mui/icons-material/Send";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import "../assets/css/styles.css";

const FormularioFacturas = () => {
  const productos = [];

  const url = "http://localhost:3300/api/facturas/crear";

  const [repuestos, setRepuestos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();

  const [datosTabla, setDatosTabla] = useState(productos);
  //hook para controlar la apertura del modal
  const [banderaModal, setBanderaModal] = useState(false);
  //hook de creacion
  const [producto, setProducto] = useState({
    NombrePrd: "",
    PrecioPrd: "",
    CantidadPrd: "",
    TotalPrd: "",
  });
  const [factura, setFactura] = useState();
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: "",
    nombre: "",
    precio: "",
    cantidad: "",
  });
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura((prevForm) => ({
      ...prevForm,
      //ojo con los nombres de los inputs
      [name]: value,
    }));
    console.log(name, value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/repuestos")
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        if (response.data.success) {
          setRepuestos(response.data.data);
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

  if (cargando) return <CircularProgress />;
  if (error) return <Alert>{error}</Alert>;

  const seleccionarProducto = (prdSeleccionado) => {
    //setear datos a los inputs
    setProductoSeleccionado(prdSeleccionado);
  };

  const agregarProducto = () => {
    if (!cantidadSeleccionada || cantidadSeleccionada <= 0) {
      alert("Ingrese una cantidad válida");
      return;
    }

    if (cantidadSeleccionada > productoSeleccionado.cantidad) {
      alert("La cantidad seleccionada excede el stock disponible");
      return;
    }

    const nuevoPrd = {
      repuestoId: productoSeleccionado.id,
      NombrePrd: productoSeleccionado.nombre,
      PrecioPrd: productoSeleccionado.precio,
      CantidadPrd: cantidadSeleccionada,
      TotalPrd: productoSeleccionado.precio * cantidadSeleccionada,
    };

    setDatosTabla((prevDatos) => [...prevDatos, nuevoPrd]);
    setBanderaModal(false);
    setCantidadSeleccionada("");
    setProductoSeleccionado({ id: "", nombre: "", precio: "", cantidad: "" });
  };

  const cerrarModal = () => {
    setBanderaModal(false);
    setCantidadSeleccionada("");
    setProductoSeleccionado({ id: "", nombre: "", precio: "" });
  };

  const quitarProducto = (index) => {
    const nuevosProductos = [...datosTabla];
    nuevosProductos.splice(index, 1);
    setDatosTabla(nuevosProductos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !factura?.cl_nombre ||
      !factura?.cl_apellido ||
      !factura?.cl_cedula ||
      !factura?.cl_telefono ||
      !factura?.cl_ubicacion ||
      datosTabla.length === 0
    ) {
      alert("Complete los datos del cliente y agregue al menos un producto.");
      return;
    }

    //Transformar productos al formato esperado en el backend
    const productosTransformados = datosTabla.map((producto) => ({
      repuestoId: producto.repuestoId,
      cantidad: producto.CantidadPrd,
    }));

    // Estructura final plana
    const datosFactura = {
      ...factura, //desestructura
      productos: productosTransformados,
    };

    console.log("Enviando datos de factura:", datosFactura);

    axios
      .post(url, datosFactura)
      .then((response) => {
        console.log("Factura enviada:", response.data);
        alert("Factura registrada con éxito");

        setFactura({
          cl_nombre: "",
          cl_apellido: "",
          cl_cedula: "",
          cl_telefono: "",
          cl_ubicacion: "",
        });

        setDatosTabla([]);
      })
      .catch((error) => {
        console.error("Error al registrar la factura:", error);
        if (error.response) {
          console.error("Datos de respuesta:", error.response.data);
          console.error("Código de estado:", error.response.status);
        }
        alert("Error al enviar la factura");
      });
  };

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
            <label htmlFor="cl_apellido">Apellidos</label>
            <Input
              id="cl_apellido"
              name="cl_apellido"
              onChange={handleChange}
              placeholder="Ingrese los apellidos del cliente"
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
            <label htmlFor="cl_ubicacion">Ubicación</label>
            <Input
              id="cl_ubicacion"
              name="cl_ubicacion"
              onChange={handleChange}
              placeholder="Ingrese la ubicación del cliente"
              fullWidth
            />
          </div>
        </fieldset>
        <TableContainer>
          <Table className="custom-table">
            <TableHead>
              <TableRow>
                <TableCell>ID del producto</TableCell>
                <TableCell>Producto/Servicio</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datosTabla.map((prod, index) => (
                <TableRow key={index}>
                  <TableCell>{prod.repuestoId}</TableCell>
                  <TableCell>{prod.NombrePrd}</TableCell>
                  <TableCell>{prod.PrecioPrd}</TableCell>
                  <TableCell>{prod.CantidadPrd}</TableCell>
                  <TableCell>{prod.TotalPrd}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      endIcon={<DeleteIcon />}
                      onClick={() => quitarProducto(index)}
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="form-group">
          <Button
            onClick={() => {
              setProductoSeleccionado({
                id: "",
                nombre: "",
                precio: "",
                cantidad: "",
              });
              setCantidadSeleccionada("");
              setBanderaModal(true);
            }}
            color="info"
            variant="contained"
            className="button"
          >
            Detalles de factura
          </Button>
        </div>
        <Button
          color="success"
          variant="contained"
          className="button"
          endIcon={<SendIcon />}
          type="submit"
        >
          Crear Orden
        </Button>

        {/* Planeo manejar una bandera para abrir un modal de seleccionar el servicio con un select a la BD y seleccionar el producto */}
      </form>

      <Modal
        open={banderaModal}
        onClose={cerrarModal}
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
              width: 700,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione sus productos
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead sx={{ backgroundColor: "blue" }}>
                  <TableRow>
                    <th style={{ color: "white" }}>ID</th>
                    <th style={{ color: "white" }}>Nombre</th>
                    <th style={{ color: "white" }}>Precio</th>
                    <th style={{ color: "white" }}>Restantes</th>
                    <th style={{ color: "white" }}>Acciones</th>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repuestos.map((rep) => (
                    <TableRow key={rep.id}>
                      <TableCell>{rep.id}</TableCell>
                      <TableCell>{rep.nombre}</TableCell>
                      <TableCell>{rep.precio}</TableCell>
                      <TableCell>{rep.cantidad}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => seleccionarProducto(rep)}
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
            {/* //agregar campo de cantidad y setear datos */}
            <form action="">
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <Input
                  id="id"
                  name="id"
                  value={productoSeleccionado.id}
                  fullWidth
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={productoSeleccionado.nombre}
                  fullWidth
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <Input
                  id="precio"
                  name="precio"
                  value={productoSeleccionado.precio}
                  fullWidth
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="cantidad">Cantidad</label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  min={1}
                  max={productoSeleccionado.cantidad}
                  value={cantidadSeleccionada}
                  onChange={(e) =>
                    setCantidadSeleccionada(parseInt(e.target.value))
                  }
                  fullWidth
                />
              </div>
              <Button
                onClick={() => agregarProducto()}
                variant="contained"
                color="success"
              >
                Agregar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FormularioFacturas;
