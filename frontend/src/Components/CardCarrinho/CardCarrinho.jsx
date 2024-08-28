import React, {useState} from "react";

export default function CardCarrinho(props)
{
    const[quantidade, setQuantidade] = useState(1);
    return(
        <div className="card mb-3">
            <div className="row">             
                <div className="col-md-11">
                    <h4 className="card-title">{props.nomeProduto}: R${props.preco} a unidade</h4>
                    <p className="card-text">{props.descricao}<br/>Defina a quantidade que deseja:</p>

                    <div className="input-group">  {/*|-| 1 |+|*/}
                        <button className="btn btn-outline-secondary" id="MenosQuantidade" type="button" onClick={() => quantidade > 1 ? setQuantidade(quantidade - 1) : ""}>-</button>                       
                        <input readOnly defaultValue={quantidade} value={quantidade} className="formControl" id="QuantidadeProduto"></input>
                        <button className="btn btn-outline-secondary" id="MaisQuantidade" type="button" onClick={() => quantidade < 10 ? setQuantidade(quantidade + 1) : ""}>+</button>
                    </div>

                    <h5 className="card-title">Total: R${props.preco * quantidade}</h5>
                </div>
                <div className="col-md-1">
                    <img src={props.logo} className="img-thumbnail"></img>
                </div>
            </div>
            
        </div>
    );

    
}
