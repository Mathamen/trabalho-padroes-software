import React, { useState } from 'react';
import { Mediator } from '../../Mediator.js';
import PedidoRestaurante from '../../Components/GerenciarPedidos/PedidoRestaurante.jsx';
import PedidoCliente from '../../Components/GerenciarPedidos/PedidoCliente.jsx';
const Pedidos = () => {
  const [online, setOnline] = useState(null);
  Mediator.ping(Mediator.ORDERS).then(result=>setOnline(result));

  const pedidos = [
    {
      state: 'Solicitado',
      listitems : "Pizza de atum,salada de frutas",
      cnpj_restaurant: '11111',
      cpf_client: '1111',
    },
    {
      state: 'Em preparo',
      listitems : "Pizza de sardinha,mineirinho 2L",
      cnpj_restaurant: '11121',
      cpf_client: '2222',
    },
  ];


  if (online === Mediator.OFFLINE){
    return <div>Pedidos offline</div>
  }else if (online === Mediator.ONLINE){

    if(true){
        return (<div className='container'>
          <h2>Acompanhe o status de seus pedidos: </h2>
          {pedidos
          .filter((ped) => ped.cpf_client === '2222')
          .map((ped) => <PedidoCliente {...ped} />)}
        </div>);
    }
    else{
      return(
        <div className='container'>
          <h2>Gerencie seus pedidos: </h2>
          {pedidos
          .filter((ped) => ped.cnpj_restaurant === '11111')
          .map((ped) => <PedidoRestaurante {...ped}/>)}
        </div>
      );{/*Substituir o 11111 pelo cnpj do restaurante logado*/}
    }
  }else{
    return <div>Carregando pedidos...</div>;
  }
};

export default Pedidos;
