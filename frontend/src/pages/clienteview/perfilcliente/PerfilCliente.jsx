import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Mediator } from '../../../Mediator.js';

const ClientProfile = () => {
  const [online, setOnline] = useState(null);
  const [client, setClient] = useState({name:"Joe Mama", email:"joe@mama.com", phone:"+55 21 96666-6666"});
  Mediator.ping(Mediator.USERS).then(result=>setOnline(result));

  if (online === Mediator.OFFLINE){
    return <div>Serviço de usuários offline</div>
  }else if (online === Mediator.ONLINE){
    return (
      <div>
        <h1>Client Profile</h1>
        <p>Name: {client.name}</p>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone}</p>
      </div>
    );
  }else{
    return <div>Carregando informações do usuário...</div>;
  }
};

export default ClientProfile;
