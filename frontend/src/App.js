import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Pedidos from './pages/pedidos/pedidos';
import CreateCliente from './pages/clienteview/createcliente/CreateCliente.jsx';
import PerfilCliente from './pages/clienteview/perfilcliente/PerfilCliente.jsx';
import {store} from './app/store';
import { Provider } from 'react-redux';



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
      <Provider store={store}>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<CreateCliente />} />
            <Route path="/home" element={states.home === 'online' ? <Home /> : <div>Home is offline</div>} />
            <Route path="/pedidos" element={states.pedidos === 'online' ? <Pedidos /> : <div>Pedidos is offline</div>} />
            <Route path="/profile" element={<PerfilCliente />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
  
}

export default App;
