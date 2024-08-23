import React from 'react';
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
          <button className='btn btn-light' id="fazerPedidoBtn">
            <img src={pedir}></img>
            <h4>Realizar Pedido</h4>
          </button>
        </td>
        <td>
          <button className='btn btn-light' id="carrinhoBtn">
            <img src={carrinho}></img>
            <h4>Seu carrinho</h4>
          </button>
        </td>
      </tr> 
      <tr>
        <td>
          <button className='btn btn-light' id="RastrearBtn">
            <img src={radar}></img>
            <h4>Rastreamento</h4>
          </button>
        </td>
        <td>
          <button className='btn btn-light' id="listaPedidosBtn">
            <img src={listaPedidos}></img>
            <h4>Seus pedidos</h4>
          </button>
        </td>
      </tr> 
      </tbody>
    </table>    
  </>
};

export default Home;