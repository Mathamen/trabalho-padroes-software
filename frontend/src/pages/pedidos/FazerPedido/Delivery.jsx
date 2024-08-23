import React from 'react';
import { Link } from 'react-router-dom';

import CardRestaurante from "./CardRestaurante.jsx";
import logoTeste from "../../../images/logo2.png";

const restaurantes = [ //Apenas para que eu possa ver o design. Depois podemos deletar
    {
      nome: "Pizzaria do seu Zé",
      categoria: "pizzaria",
      bairro: "Centro",
      logo: logoTeste,
      distancia: 1.5
    },
    {
      nome: "Mercadinho + Barato",
      categoria: "mercado",
      bairro: "Vila Nova",
      logo: logoTeste,
      distancia: 3.5
    },
    {
      nome: "Comida Chinesa Express",
      categoria: "comida chinesa",
      bairro: "Jardim das Flores",
      logo: logoTeste,
      distancia: 2.5
    }
  ];
  
export default function Delivery()
{
    return(
        <main className='container'>
            <h1>Escolha o restaurante que gostaria de comprar: </h1>
            <hr/>
            <div className='row'>
                    {restaurantes.map((restaurante) =>
                        <CardRestaurante {...restaurante} />
                    )}
            </div>
        </main>
    );
};