import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "./controllers/frontController";
import "./assets/css/estilos.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes
import Navbar from "./components/Navbar.jsx";
import Logout from "./components/Logout.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Vistas
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import RepuestosList from "./views/RepuestosList.jsx";
import RepuestoForm from "./views/RepuestoForm.jsx";
//vistas de factura
import Tabla from "./views/Tabla.jsx";
import DetallesFactura from "./views/DetallesFactura.jsx";
import FormularioFacturas from "./views/FormFactura.jsx";
import AprobarFactura from "./views/AprobarFactura.jsx";
import SubMenuFacturas from "./views/SubMenuFactura.jsx";
//vistas de reparaciones
import MenuReparaciones from "./views/MenuReparaciones.jsx";
import TablaReparacionesCi from "./views/TablaReparacionesCi.jsx";
import TablaReparacionesId from "./views/TablaReparacionesId.jsx";
import TablaReparaciones from "./views/TablaReparaciones.jsx";
import ReparacionForm from "./views/ReparacionForm.jsx";
import ActualizarReparacionForm from "./views/ActualizarReparacionForm.jsx";
import TablaReparacionesEmpleado from "./views/TablaReparacionesEmpleado.jsx";
import EliminarReparacion from "./views/EliminarReparacionForm.jsx";

// Rutas solo para administrador
const AdminRoute = ({ children }) => {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.rol === "admin";

  if (!isAuthenticated() || !isAdmin) {
    // Redirigir a inicio si se cuela un usuario 😡
    return <Navigate to="/" replace />;
  }

  return children;
};

// Redirigir al login rutas que se requiere de autenticacion
const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(
    "Aplicación de reparación de teléfonos"
  );

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  // Funcion para cambiar el titulo
  const changeHeaderTitle = (newTitle) => {
    setHeaderTitle(newTitle);
  };

  return (
    <Router>
      <div className="App">
        <Header title={headerTitle} />
        <Navbar isLoggedIn={loggedIn} />

        <Routes>
          {/* rutas publicas */}
          <Route path="/" element={<Home changeTitle={changeHeaderTitle} />} />
          <Route
            path="/login"
            element={<Login changeTitle={changeHeaderTitle} />}
          />
          <Route
            path="/register"
            element={<Register changeTitle={changeHeaderTitle} />}
          />
          <Route path="/logout" element={<Logout />} />

          {/* rutas posbiles, Diagnostico , factura, libre */}
          <Route
            path="/reparaciones"
            element={
              <MenuReparaciones
                changeTitle={() => changeHeaderTitle("Reparaciones")}
              />
            }
          />
          <Route
            path="/factura"
            element={
              <SubMenuFacturas
                changeTitle={() => changeHeaderTitle("Factura")}
              />
            }
          />
          <Route
            path="/libre5"
            element={<Home changeTitle={() => changeHeaderTitle("Libre 5")} />}
          />
          <Route
            path="/reparaciones/cliente"
            element={<TablaReparacionesCi changeTitle={changeHeaderTitle} />}
          />
          <Route
            path="/reparacion"
            element={<TablaReparacionesId changeTitle={changeHeaderTitle} />}
          />

          {/* rutas de autenticacion */}
          <Route
            path="/repuestos"
            element={
              <PrivateRoute>
                <RepuestosList changeTitle={changeHeaderTitle} />
              </PrivateRoute>
            }
          />

          {/* rutas administrador */}
          <Route
            path="/repuestos/nuevo"
            element={
              <AdminRoute>
                <RepuestoForm changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
          <Route
            path="/repuestos/editar/:id"
            element={
              <AdminRoute>
                <RepuestoForm changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
          <Route
            path="/facturas"
            element={<Tabla changeTitle={changeHeaderTitle} />}
          />
          <Route
            path="/factura/crear"
            element={
              <AdminRoute>
                <FormularioFacturas changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/detalles/:order_id"
            element={
              <AdminRoute>
                <DetallesFactura changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/facturas/no-aprobadas"
            element={
              <AdminRoute>
                <AprobarFactura changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/reparaciones/todas"
            element={
              <AdminRoute>
                <TablaReparaciones changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
          <Route
            path="/reparaciones/empleado"
            element={
              <AdminRoute>
                <TablaReparacionesEmpleado changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
          <Route
            path="/reparaciones/crear"
            element={
              <AdminRoute>
                <ReparacionForm changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
          <Route
            path="/reparaciones/actualizar"
            element={
              <AdminRoute>
                <ActualizarReparacionForm changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
          <Route
            path="/reparaciones/eliminar"
            element={
              <AdminRoute>
                <EliminarReparacion changeTitle={changeHeaderTitle} />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
