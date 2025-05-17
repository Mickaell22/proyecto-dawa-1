import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { isAuthenticated } from './controllers/frontController';
import './assets/css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Navbar from './components/Navbar.jsx';
import Logout from './components/Logout.jsx';

// Vistas
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Aplicación de reparación de teléfonos");
  
  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);
  
  // Funcion para cambiar el título del Header
  const changeHeaderTitle = (newTitle) => {
    setHeaderTitle(newTitle);
  };
  
  return (
    <Router>
      <div className="App">
        <Header title={headerTitle} />
        <Navbar isLoggedIn={loggedIn} />
        
        <Routes>
          <Route path="/" element={<Home changeTitle={changeHeaderTitle} />} />
          <Route path="/login" element={<Login changeTitle={changeHeaderTitle} />} />
          <Route path="/register" element={<Register changeTitle={changeHeaderTitle} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;