import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from './controllers/frontController';
import './assets/css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Componentes
import Navbar from './components/Navbar.jsx';
import Logout from './components/Logout.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Vistas
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import RepuestosList from './views/RepuestosList.jsx';
import RepuestoForm from './views/RepuestoForm.jsx';
import Tabla from './views/Tabla.jsx';

// Rutas solo para administrrador
const AdminRoute = ({ children }) => {
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.rol === 'admin';
  
  if (!isAuthenticated() || !isAdmin) {
    // Redirigir a inicio si se cuela un usuario 😡
    return <Navigate to="/repuestos" replace />;
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
  const [headerTitle, setHeaderTitle] = useState("Aplicación de reparación de teléfonos");
  
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
          <Route path="/login" element={<Login changeTitle={changeHeaderTitle} />} />
          <Route path="/register" element={<Register changeTitle={changeHeaderTitle} />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* rutas posbiles, Diagnostico , factura, libre */}
          <Route path="/diagnostico" element={<Home changeTitle={() => changeHeaderTitle("Diagnóstico")} />} />
          <Route path="/factura" element={<Tabla changeTitle={() => changeHeaderTitle("Factura")} />} />
          <Route path="/libre5" element={<Home changeTitle={() => changeHeaderTitle("Libre 5")} />} />
          
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;