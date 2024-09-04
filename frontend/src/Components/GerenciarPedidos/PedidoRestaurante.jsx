import React from "react";

export default function PedidoRestaurante(props)
{
    const itensPedidos = props.listitems.split(",");

    return(
        <div className="card row">
            <h2>Produtos solicitados: </h2>
            {itensPedidos.map((item) => <div className="col">
                <ul>{item}</ul>
            </div>)}
            <h2>Status do pedido: <i>{props.state}</i></h2>
            <div className="col ">
                <button className="btn btn-primary" onClick={PrepararPedido}>Preparar Pedido</button>
                <button className="btn btn-primary" onClick={MandarEntregar}>Mandar Entregar</button>
            </div>
        </div>
    );
}

function PrepararPedido()
{
    alert('Preparando o seu pedido, mas ainda nao fazendo absolutamente nada no back');
    //Vai de Solicitado pra Em preparo
}

function MandarEntregar()
{
    alert('Mandando o seu pedido, mas ainda nao fazendo absolutamente nada no back');
    //Vai de Em preparo pra A caminho
    //Depois fazer a logica de esperar 15 seg pra enviar
    //Pra ir de A caminho pra entregue
}