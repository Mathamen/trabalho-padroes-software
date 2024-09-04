import React from "react";
import {Link} from "react-router-dom";

export default function CardRestaurante(props)
{
    return(
        <div className="card mb-3 col-md-6">
            <div className="row">
                <div className="col-md-4">{/*Um terço do card pra imagem*/}
                    <img src={props.logo} className="img-thumbnail"></img>
                </div>
                <div className="col-md-8">{/*O restante para as demais informacoes*/}
                    <h5 className="card-title">{props.name} - {props.address}</h5>
                    <p className="card-text">{props.email}</p>

                    <Link to="/restaurante" state={props}> {/*Passagem do restaurante atraves de state. Claro que com Redux isso vai mudar, mas dando uma ideia*/}
                      <button className='btn btn-primary'>Ver restaurante</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}