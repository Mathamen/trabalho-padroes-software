import React from "react";

export default function CardProduto(props)
{
    return(
        <div className="card mb-3 col-md-6">
            <div className="row">             
                <div className="col-md-8">{/*O restante para as demais informacoes*/}
                    <h4 className="card-title">{props.name}</h4>
                    <p className="card-text">{props.description}</p>
                    <h5 className="card-title">R${props.price}</h5>
                </div>
                <div className="col-md-4">{/*Um terço do card pra imagem*/}
                    <img src={props.photo} className="img-thumbnail"></img>
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

