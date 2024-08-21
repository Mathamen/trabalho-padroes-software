import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setClient } from '../../features/actions/ClienteActions.js';

const CreateClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular uma chamada de API
    const newClient = { name, email, phone };

    dispatch(setClient(newClient));

    // Limpar os campos
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <h1>Create Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
};

export default CreateClient;
