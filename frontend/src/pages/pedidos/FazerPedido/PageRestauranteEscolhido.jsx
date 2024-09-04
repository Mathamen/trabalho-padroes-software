import React, {useState, useEffect } from "react";
import LogoTeste from '../../../images/logo2.png';

import CardProduto from "../../../Components/ItemCardapio/CardProduto.jsx";
import {useLocation} from 'react-router-dom';
import { Mediator } from '../../../Mediator.js';


export default function PageRestauranteEscolhido(){
    const hist = useLocation();
    const restauranteState = hist.state || {logo: LogoTeste, nome: "Nome teste"}; //Esse ou é só pra garantir
    //Que se alguem abrir essa page antes de delivery não caia em um erro de nullReference

    const [online, setOnline] = useState(null);
    Mediator.ping(Mediator.RESTAURANT_ITEMS).then(result=>setOnline(result));

    const [produtos, setProduto] = useState([]) ;

    const fetchItems = async () => {
        try {
          const restaurantId = Mediator.user_id; // ou um id fixo se já conhecido
          const response = await Mediator.get_items("11-111-11/0001-1");
    
          if (response === Mediator.NOT_FOUND) {
            console.log("Restaurante não encontrado.");
          } else if (response === Mediator.ALREADY_EXISTS) {
            console.log("Itens já existem.");
          } else {
            setProduto(response); // Supondo que a resposta seja um array de itens
          }
        } catch (err) {
          console.log("Erro ao buscar itens.");
        }
      };

    const [buscaNome, setBuscaNome] = useState('');
    const produtosFiltrados = produtos.filter((prod) =>
        prod.name.toLowerCase().includes(buscaNome.toLowerCase())
    );

    console.log(produtos);

    const page = (
        <main className='container' onLoad={() => fetchItems}>
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
