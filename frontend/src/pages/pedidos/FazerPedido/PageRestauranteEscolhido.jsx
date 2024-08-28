import React, {useState, useEffect } from "react";
import LogoTeste from '../../../images/logo2.png';

import CardProduto from "../../../Components/ItemCardapio/CardProduto.jsx";
import {useLocation} from 'react-router-dom';


const produtos = [
    {
        nomeProduto : "Pizza de calabresa família",
        descricao : "Uma pizza com 35 cm de diâmetro coberta de calabresas e cebolas deliciosas!",
        preco : 35,
        imagem : LogoTeste
    },
    {
        nomeProduto : "Mineirinho 2L",
        descricao : "O refrigerante de 2L mais vendido do Rio",
        preco : 12,
        imagem : LogoTeste
    },
    {
        nomeProduto : "Pizza de 4 queijos brotinho",
        descricao : "Uma pizza com 9 cm de diâmetro com quatro queijos de verdade!",
        preco : 17,
        imagem : LogoTeste
    }
]

export default function PageRestauranteEscolhido()
{
    const hist = useLocation();
    const restauranteState = hist.state || {logo: LogoTeste, nome: "Nome teste"}; //Esse ou é só pra garantir
//Que se alguem abrir essa page antes de delivery não caia em um erro de nullReference

    const [buscaNome, setBuscaNome] = useState('');

    const produtosFiltrados = produtos.filter((prod) =>
        prod.nomeProduto.toLowerCase().includes(buscaNome.toLowerCase())
    );
    console.log(restauranteState);
    return(
        <main className='container'>
            <div className="row">
                <div className="col-md-1">
                    <img src={restauranteState.logo} className="img-thumbnail"/>
                </div>
                <div className="col-md-11">
                    <h2>{restauranteState.nome}</h2>
                </div>
            </div>
            
            <br/><br/>

            <div className="row">
                <div className="col-md-6">
                    <h1>Escolha sua refeicao: </h1>
                </div>
                <div className="col-md-6">
                    <input type="text" value={buscaNome} onChange={(e) => {setBuscaNome(e.target.value)}}
                     placeholder="busque no cardápio..." className="input-group"></input>
                </div>
            </div>

            <hr />

            <div className='row'>{/*Lembrar de fazer map apenas dos produtos que tem referencia ao restaurante*/}
                    {produtosFiltrados.map((produto) =>
                        <CardProduto {...produto} />
                    )}
            </div>

        </main>
    );
}
