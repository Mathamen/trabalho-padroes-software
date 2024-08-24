import React from "react";
import LogoTeste from '../../images/logo2.png';

export default function Carrinho()
{
    const restaurantesPedidos =[
        {
            cnpj : "00000", 
            nome: "Pizzaria do Seu Zé",
            logo : LogoTeste
        },
        {
            cnpj : "111111", 
            nome: "Churros da Vala",
            logo : LogoTeste
        },
    ];
    const produtosPedidos = [
        {
            cnpjRestaurante : "00000", 
            nomeProduto: "Mineirinho 2L",
            preco : 9,
            logo : LogoTeste
        },
        {
            cnpjRestaurante : "111111", 
            nomeProduto: "Churros de chocolate",
            preco : 5,
            logo : LogoTeste
        },
        {
            cnpjRestaurante : "00000", 
            nomeProduto: "Pizza de 4 queijos",
            preco : 15,
            logo : LogoTeste
        }
    ];
    return(
        <div className="container">
            <h2>Seu Carrinho: </h2>
            {restaurantesPedidos.map((restaurante)=>
            <>
                <div className="row g-3">
                    <div className="col-md-1">
                        <img src={restaurante.logo} className="img-thumbnail"/>
                    </div>
                    <div className="col-md-11">
                        <h3>{restaurante.nome}</h3>
                    </div>
                    
                </div>
                <div className="row g-3">
                {produtosPedidos
                    .filter((produto) => produto.cnpjRestaurante === restaurante.cnpj)
                    .map((prod) => (
                    <h6 key={prod.nomeProduto}>{prod.nomeProduto}</h6>
                ))}
                </div>

            </>   
            )}

            <button className="btn btn-primary">Fechar pedido em: </button>
        </div>
    );
}