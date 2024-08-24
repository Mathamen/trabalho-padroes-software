import React from 'react';
import { Link } from 'react-router-dom';

import CardRestaurante from "../../../Components/CardRestaurante/CardRestaurante.jsx";
import logoTeste from "../../../images/logo2.png";

const restaurantes = [ //Apenas para que eu possa ver o design. Depois podemos deletar
  {
      cnpj : "57.687.813/0001-19",
      nome: "Pizzaria do seu Zé",
      categoria: "pizzaria",
      bairro: "Centro",
      logo: logoTeste,
      distancia: 1.5
    },
    {
      cnpj : "83.745.085/0001-64",
      nome: "Mercadinho + Barato",
      categoria: "mercado",
      bairro: "Vila Velha",
      logo: logoTeste,
      distancia: 3.5
    },
    {
      cnpj : "83.745.085/0001-64",
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
                  <>
                    <CardRestaurante key={restaurante.cnpj} {...restaurante} />
                  </>
                )}
              </div>

        </main>
    );
};