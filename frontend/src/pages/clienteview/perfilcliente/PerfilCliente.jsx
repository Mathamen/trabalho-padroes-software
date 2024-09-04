import React, {useState} from 'react';
import { Link } from 'react-router-dom';
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
      <div className='container'>
        <h1>Client Profile</h1>
        <p>Name: {client.name}</p>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone}</p>
        <hr />
        {liberarFuncaoCriarItem()}
      </div>
    );
  }else{
    return <div>Carregando informações do usuário...</div>;
  }
};

function liberarFuncaoCriarItem()
{
  if(true)//Se o usuario logado for um restaurante
  {
    return(
      <div>
        <h3>Gostaria de adicionar algum item no seu cardápio?</h3>
        <Link to='/createItem'>
          <button className='btn btn-primary'>Criar item</button>
        </Link>
      </div>
    );
  }
}

export default ClientProfile;
