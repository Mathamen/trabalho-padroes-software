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

function ping(){
  let urls = [
    {"url":'http://localhost:8000',
      "name":'orders',
    },
    {"url":'http://localhost:8001',
      "name":'restaurant_items',
    },
    {"url":'http://localhost:8002',
      "name":'users',
    },
  ]
  const fetchPromises = urls.map(url =>
    fetch(url.url).then(response => {
      console.log(`ping ${url.name}:`);
      if (response.status === 200) {
        console.log('success');
      } else {
        console.log('internal server error');
      }
    })
    .catch(()=>console.error(`${url.name} is offline`))
  );
}

function App() {
    const [states, setStatus] = useState({ home: 'offline', pedidos: 'offline' });
    useEffect(()=>ping())
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
