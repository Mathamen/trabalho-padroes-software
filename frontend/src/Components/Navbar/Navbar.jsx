import React from 'react';
import './Navbar.css';
import logo from './../../images/logo2.png'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><img src={logo} alt="MyApp Logo" /></div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">Cardápios</a></li>
        <li><a href="#services">Seus Pedidos</a></li>
        <li><a href="#contact">Perfil</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;