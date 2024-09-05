import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setClient } from '../../../features/actions/ClienteActions.js';

import { Mediator } from '../../../Mediator.js';

const CreateCliente = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [emailLog, setEmailLog] = useState('');
  const [restaurante, setRestaurante] = useState(false);
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [cartao, setCartao] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const dispatch = useDispatch();

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    if(restaurante)//Criacao de um objeto restaurante
    {
      const newEntry = {
        "name":name, 
        "address":address, 
        "phone_number": phone_number,
        "cpf": cnpj,
        "email": email,
        "password": password
      };

      const response = Mediator.register(newEntry);
      if(response === Mediator.ALREADY_EXISTS)
      {
        alert("Esse restaurante já foi registrado!");
        return
      }
  
      //Depois fechar Create de Restaurante
    }
    else{
      const newEntry = {
        "name":name, 
        "address":address, 
        "phone_number": phone_number,
        "cpf": cpf,
        "email": email,
        "password": password
      };

      const response = Mediator.register(newEntry);
      if(response === Mediator.ALREADY_EXISTS)
      {
        alert("Esse usuário já foi registrado!");
        return
      }
    }
    alert("Usuário cadastrado com sucesso! Seja bem vindo ao VocêComida!");
    // Limpar os campos
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCartao('');
    setCnpj('');
    setCpf('');
    setPassword('');
  };
  const handleLogInSubmit = (e) => {
    e.preventDefault();
    
    const response = Mediator.login(emailLog, passwordLogin);
    if(response === Mediator.NOT_FOUND || response === Mediator.PASSWORD_INCORRECT)
    {
      alert("Usuário ou senha incorretos!");
      return;
    }

    setEmailLog('');
    setPasswordLogin('');
  }
  return (
    <div className='container-fluid row'>
      <div className='col-md-6'>
        <h3>Caso não possua conta, crie a sua: </h3>
        <form onSubmit={handleSignInSubmit}>
          <div className='d-flex justify-content-center'>
            <label>
              Name:
              <input
                className='form-control'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className='d-flex justify-content-center'>
            <label>
              Email:
              <input
                className='form-control'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>  
          <div className='d-flex justify-content-center'>
            <label>
              Endereço:
              <input
                className='form-control'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div> 
          <div className='d-flex justify-content-center'>
            <label>
              Telefone:
              <input
                className='form-control'
                type="text"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <div className='d-flex justify-content-center'>
            <label>
              Senha:
              <input
                className='form-control'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='d-flex justify-content-center'>
            <div class="form-check">
              <input 
              className="form-check-input" 
              type="checkbox" 
              value={restaurante} 
              onChange={(e) => setRestaurante(e.target.checked)}/>
              
              <label class="form-check-label" for="flexCheckDefault">
                Gostaria de uma conta de restaurante?
              </label>
            </div>
          </div>

          {cpfOuCnpj()}

          <div className='d-flex justify-content-center'>
            <label>
              Número do cartão:
              <input
                className='form-control'
                type="text"
                value={cartao}
                onChange={(e) => setCartao(e.target.value)}
              />
            </label>
          </div>
          <br/><div className='d-flex justify-content-center'>
            <button className='btn btn-primary' type="submit">Cadastrar</button>
          </div>
        </form>
      </div>


      <div className='col-md-6'>
        <h3>Já possui conta? Entre aqui:</h3>
        <form onSubmit={handleLogInSubmit}>
        <div className='d-flex justify-content-center'>
            <label>
              Email:
              <input
                className='form-control'
                type="email"
                value={emailLog}
                onChange={(e) => setEmailLog(e.target.value)}
              />
            </label>
        </div>
        <div className='d-flex justify-content-center'>
            <label>
              Senha:
              <input
                className='form-control'
                type="password"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
            </label>
          </div><br/>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-secondary' type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );

  function cpfOuCnpj()
  {
    if(restaurante)
    {
      return(
        <div className='d-flex justify-content-center'>
            <label>
              CNPJ:
              <input
                className='form-control'
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </label>
          </div>
      );
    }
    else if(!restaurante){
      return(
        <div className='d-flex justify-content-center'>
            <label>
              CPF:
              <input
                className='form-control'
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </label>
          </div>
      );
    }
  }
};

export default CreateCliente;
