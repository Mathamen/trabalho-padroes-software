import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setClient } from '../../../features/actions/ClienteActions.js';

const CreateCliente = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [emailLog, setEmailLog] = useState('');
  const [restaurante, setRestaurante] = useState(false);

  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [cartao, setCartao] = useState('');

  const dispatch = useDispatch();

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    // Simular uma chamada de API
    const newClient = { name, email, phone };

    dispatch(setClient(newClient));

    // Limpar os campos
    setName('');
    setEmail('');
    setPhone('');
    setEndereco('');
    setCartao('');
    setCnpj('');
    setCpf('');
  };
  const handleLogInSubmit = (e) => {
    e.preventDefault();
    setEmail('');

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
              Endereco:
              <input
                className='form-control'
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </label>
          </div> 
          <div className='d-flex justify-content-center'>
            <label>
              Telefone:
              <input
                className='form-control'
                type="text"
                value={phone}
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
