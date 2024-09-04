import React, {useState} from "react";
import logo from './../../images/logo2.png';
import CardProduto from "../../Components/ItemCardapio/CardProduto";
import { Mediator } from "../../Mediator";

export default function CreateItemPage()
{
    const[name, setName] = useState(""); 
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState(0);
    const[photo, setPhoto] = useState(logo); //Ja deixando como photo a nossa logo padrao
    const[cnpj_restaurant, setCNPJ] = useState("11-111-11/0001-1");//Aqui tambem seria bom deixar padrao o cnpj do restaurante

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            name,
            description,
            price,
            photo,
            cnpj_restaurant
        };

        const response = await Mediator.add_item(newItem);
        
        if (response === Mediator.INVALID_SESSION) {
            console.error("Sessão inválida. Faça login novamente.");
        } 
        else if (response === Mediator.ALREADY_EXISTS) {
            console.error("Este item já existe.");
        } 
        else {
        // Item criado com sucesso, você pode limpar o formulário ou redirecionar o usuário
            alert("Item criado com sucesso:", response);
            setName('');
            setDescription('');
            setPrice('');
        }
    }
    return(
        <div className="container">
            <h2>Adicione um novo item ao seu cardápio!</h2>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center'>
                    <label>
                    Nome do produto:
                    <input
                        className='form-control'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </label>
                </div>
                <div className='d-flex justify-content-center'>
                    <label>
                    Descrição:
                    <textarea
                        rows="3"
                        className='form-control'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </label>
                </div>
                <div className='d-flex justify-content-center'>
                    <label>
                    Preço:
                    <input
                        className='form-control'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </label>
                </div>
                <div className='d-flex justify-content-center'>
                    <h5>Serviço de upload de imagens em manutenção. Seu produto será exibido com uma imagem padrão</h5>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary' type="submit">Criar item</button>
                </div>
          </form>

          <hr />
        <div className="row d-flex justify-content-center">
            <CardProduto name={name} description ={description} photo={photo} price={price} />
        </div>
        </div>
    )
}