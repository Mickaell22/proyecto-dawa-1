// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './controllers/frontController';
import './assets/css/estilos.css';


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
  
  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Navbar isLoggedIn={loggedIn} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          {}
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;