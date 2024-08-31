import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import Pedidos from './pages/pedidos/pedidos';
import CreateCliente from './pages/clienteview/createcliente/CreateCliente.jsx';
import PerfilCliente from './pages/clienteview/perfilcliente/PerfilCliente.jsx';
import Delivery from './pages/pedidos/FazerPedido/Delivery.jsx';
import PageRestauranteEscolhido from './pages/pedidos/FazerPedido/PageRestauranteEscolhido.jsx';
import Carrinho from './pages/Carrinho/Carrinho.jsx';
import {store} from './app/store';
import { Provider } from 'react-redux';
import { Mediator } from './Mediator.js';

function App() {
    const [states, setStatus] = useState({ home: 'offline', pedidos: 'offline' });
    //TO DO: trocar esse json pra estados separados, tlvz até abandonar tudo e fazer um reducer direito
    Mediator.ping(Mediator.USERS).then(result=>{
      if(result === Mediator.SERVER_ERROR){
        console.error("algo de errado no servidor");
      }else if(result === Mediator.ONLINE){
        setStatus({home:'online', pedidos: 'offline'})
      }
    });
  return (
    <div>
      <Provider store={store}>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<CreateCliente />} />
            <Route path="/home" element={states.home === 'online' ? <Home /> : <div>Home is offline</div>} />
            <Route path="/pedidos" element={states.pedidos === 'online' ? <Pedidos /> : <div>Pedidos is {states.pedidos}</div>} />
            <Route path="/profile" element={<PerfilCliente />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/restaurante" element={<PageRestauranteEscolhido />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
  
}

export default App;
