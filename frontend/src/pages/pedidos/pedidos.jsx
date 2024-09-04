import React, { useState } from 'react';
import { Mediator } from '../../Mediator.js';

const Pedidos = () => {
  const [online, setOnline] = useState(null);
  Mediator.ping(Mediator.ORDERS).then(result=>setOnline(result));

  if (online === Mediator.OFFLINE){
    return <div>Pedidos offline</div>
  }else if (online === Mediator.ONLINE){
    return <h2>Pedidos Page</h2>;
  }else{
    return <div>Carregando pedidos...</div>;
  }
};

export default Pedidos;
