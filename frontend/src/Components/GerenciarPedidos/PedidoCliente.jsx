import React from "react";

export default function PedidoCliente(props)
{
    console.log(props.cpf_client)
    const itensPedidos = props.listitems.split(",");

    return <div className="card row">
        <h2>Produtos solicitados: </h2>
        {itensPedidos.map((item) => <div className="col">
            <ul>{item}</ul>
        </div>)}
        <h2>Status do pedido: <i>{props.state}</i></h2>
    </div>
}