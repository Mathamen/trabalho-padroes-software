import React from "react";

export default function CardProduto(props)
{
    return(
        <div className="card mb-3 col-md-6">
            <div className="row">             
                <div className="col-md-8">{/*O restante para as demais informacoes*/}
                    <h4 className="card-title">{props.nomeProduto}</h4>
                    <p className="card-text">{props.descricao}</p>
                    <h5 className="card-title">R${props.preco}</h5>
                </div>
                <div className="col-md-4">{/*Um terço do card pra imagem*/}
                    <img src={props.imagem} className="img-thumbnail"></img>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-4">
                    <button className="btn btn-primary" id="Adicionar ao carrinho">Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    );
}

/*Acho que vou inserir esse trecho no card do carrinho. Assim, o usuario so define a quantidade na hora de fechar o pedido
<div className="input-group col-md-6">  |-| 1 |+|
    <button className="btn btn-outline-secondary" id="MenosQuantidade" type="button">-</button>                       
    <input readOnly defaultValue={1} className="formControl" id="QuantidadeProduto"></input>
    <button className="btn btn-outline-secondary" id="MaisQuantidade" type="button">+</button>
</div>
*/