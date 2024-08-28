import React, {useState} from "react";

export default function CardCarrinho(props)
{
    
    return(
        <div className="card mb-3">
            <div className="row">             
                <div className="col-md-11">
                    <h4 className="card-title">{props.nomeProduto}</h4>
                    <p className="card-text">{props.descricao}<br/>Defina a quantidade que deseja:</p>

                    <h5 className="card-title">Total: R${props.preco}</h5>
                </div>
                <div className="col-md-1">
                    <img src={props.logo} className="img-thumbnail"></img>
                </div>
            </div>
            
        </div>
    );

    
}
