import React, {useState, useEffect } from "react";
import LogoTeste from '../../../images/logo2.png';

import CardProduto from "../../../Components/ItemCardapio/CardProduto.jsx";
import {useLocation} from 'react-router-dom';
import { Mediator } from '../../../Mediator.js';


const produtos = [
    {
        name : "Pizza de calabresa família",
        description : "Uma pizza com 35 cm de diâmetro coberta de calabresas e cebolas deliciosas!",
        price : 35,
        photo : LogoTeste
    },
    {
        name : "Mineirinho 2L",
        description : "O refrigerante de 2L mais vendido do Rio",
        price : 12,
        photo : LogoTeste
    },
    {
        name : "Pizza de 4 queijos brotinho",
        description : "Uma pizza com 9 cm de diâmetro com quatro queijos de verdade!",
        price : 17,
        photo : LogoTeste
    }
]

export default function PageRestauranteEscolhido(){
    const hist = useLocation();
    const restauranteState = hist.state || {logo: LogoTeste, nome: "Nome teste"}; //Esse ou é só pra garantir
    //Que se alguem abrir essa page antes de delivery não caia em um erro de nullReference

    const [online, setOnline] = useState(null);
    Mediator.ping(Mediator.RESTAURANT_ITEMS).then(result=>setOnline(result));

    const [buscaNome, setBuscaNome] = useState('');

    const produtosFiltrados = produtos.filter((prod) =>
        prod.name.toLowerCase().includes(buscaNome.toLowerCase())
    );
    console.log(restauranteState);

    const page = (
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

    
    if (online === Mediator.OFFLINE){
        return <div>Pedidos offline</div>
    }else if (online === Mediator.ONLINE){
        return page;
    }else{
        return <div>Pedidos is now loading...</div>;
    }
}
