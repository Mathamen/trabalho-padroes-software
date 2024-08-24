import React from "react";
import LogoTeste from '../../../images/logo2.png';

import CardProduto from "./CardProduto";
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
    return(
        <main className='container'>
            <div className="row">
                <div className="col-md-1">
                    <img src={LogoTeste} className="img-thumbnail"/>
                </div>
                <div className="col-md-11">
                    <h2>O Nome Do Restaurante</h2>
                </div>
            </div>
            <br/><br/>
            <div className="row">
                <div className="col-md-6">
                    <h1>Escolha sua refeicao: </h1>
                </div>
                <div className="col-md-6">
                    <input type="text" placeholder="busque no cardápio..." className="input-group"></input>
                </div>
            </div>
            <hr />
            <div className='row'>
                    {produtos.map((produto) =>
                        <CardProduto {...produto} />
                    )}
            </div>

        </main>
    );
}
