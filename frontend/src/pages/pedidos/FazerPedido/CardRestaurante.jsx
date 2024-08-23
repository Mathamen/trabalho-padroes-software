import React from "react";

export default function CardRestaurante(props)
{
    return(
        <div className="card mb-3 col-md-6">
            <div className="row">
                <div className="col-md-4">{/*Um terço do card pra imagem*/}
                    <img src={props.logo} className="img-thumbnail" height={100}></img>
                </div>
                <div className="col-md-8">{/*O restante para as demais informacoes*/}
                    <h5 className="card-title">{props.nome} - {props.bairro}</h5>
                    <p className="card-text">{props.categoria} | {props.distancia} Km</p>
                </div>
            </div>
        </div>
    );
}