import React from 'react';
import { useSelector } from 'react-redux';

const ClientProfile = () => {
  const client = useSelector((state) => state.client.client);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Client Profile</h1>
      <p>Name: {client.name}</p>
      <p>Email: {client.email}</p>
      <p>Phone: {client.phone}</p>
    </div>
  );
};

export default ClientProfile;
