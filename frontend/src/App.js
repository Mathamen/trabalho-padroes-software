import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Pedidos from './pages/pedidos/pedidos';
import CreateCliente from './pages/clienteview/createcliente/CreateCliente.jsx';
import PerfilCliente from './pages/clienteview/perfilcliente/PerfilCliente.jsx';




function App() {
    const [states, setStatus] = useState({ home: 'online', pedidos: 'online' });

  useEffect(() => {
    fetch('/states.json')
      .then(response => response.json())
      .then(data => setStatus(data))
      .catch(error => console.error('Error fetching status:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={states.home === 'online' ? <Home /> : <div>Home is offline</div>} />
        <Route path="/pedidos" element={states.pedidos === 'online' ? <Pedidos /> : <div>Pedidos is offline</div>} />
        <Route path="/" element={<CreateCliente />} />
        <Route path="/profile" element={<PerfilCliente />} />
      </Routes>
    </div>
  );
  
}

export default App;
