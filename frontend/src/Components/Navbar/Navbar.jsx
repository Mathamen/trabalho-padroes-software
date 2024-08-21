import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './../../images/logo2.png'; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="MyApp Logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><Link to="/">Teste</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;