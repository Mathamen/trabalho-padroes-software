import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import carrinho from '../../images/Carrinho.png';
import pedir from '../../images/Fazer pedido.png';
import listaPedidos from '../../images/Lista de pedidos.png'
import radar from '../../images/Radar.png'

const Home = () => {
  return <>
    <h2>Bem vindo a plataforma EuComida!</h2><br/>
    <table>
      <tbody>
      <tr>
        <td>
          <button className='btn btn-light' id="fazerPedidoBtn"><Link to="/delivery">
            <img src={pedir}></img>
            <h4>Fazer Pedido</h4>
            </Link></button>
        </td>
        <td>
          <button className='btn btn-light' id="carrinhoBtn"><Link to="/carrinho">
            <img src={carrinho}></img>
            <h4>Seu carrinho</h4>
            </Link></button>
        </td>
      </tr> 
      <tr>
        <td>
          <button className='btn btn-light' id="RastrearBtn"> <Link to="/profile">
            <img src={radar}></img>
            <h4>Seu cadastro</h4>
            </Link></button>
        </td>
        <td>
          <button className='btn btn-light' id="listaPedidosBtn"> <Link to="/pedidos">
            <img src={listaPedidos}></img>
            <h4>Seus pedidos</h4>
            </Link></button>
        </td>
      </tr> 
      </tbody>
    </table>    
  </>
};

export default Home;