
//TO DO: implementar no back as lógicas

export class Mediator{
    //valores possíveis de retorno
    static ONLINE = 0;
    static OFFLINE = 1;
    static SERVER_ERROR = 2;
    static NOT_FOUND = 3;
    static PASSWORD_INCORRECT = 4;
    static ALREADY_EXISTS = 5;
    static INVALID_SESSION = 6;
    static DELETED_SUCCESSFULLY = 7;
    static LOGGED_IN = 8;
    static LOADING = 9;
    static UPDATED = 10;
    //URLs dos microserviços 
    static ORDERS = "http://localhost:8000";
    static RESTAURANT_ITEMS = "http://localhost:8001";
    static USERS = "http://localhost:8002";
    static user_id = null;


    //ping para verificar estado do microserviço
    static ping(url){
        return fetch(url).then(response => {
            if (response.status === 200) {
              return this.ONLINE;
            } else {
              return this.SERVER_ERROR;
            }
        })
        .catch(()=>{return this.OFFLINE});
    }

    //login deve retornar o id de referência para o usuário
    static login(credential, password){
        return fetch(this.USERS+`/${credential}`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                'password': password
            })
        }).then(response => {
            if (response.status === 404){
                return this.NOT_FOUND;
            }else if(response.status === 401){
                return this.PASSWORD_INCORRECT;
            }else if(response.status === 200){
                this.user_id = response.json()['user_id'];
                return this.LOGGED_IN;
            }
        });
    }

    // Vamos pegar o id do novo objeto user que tiver sido criado e guardar pra saber quem tá loggado
    static register(credential, password){
        return fetch(this.USERS+`/${credential}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                'password':password
            })
        }).then(response => {
            if (response.status === 409){
                return this.ALREADY_EXISTS;
            }else if(response.status === 201){
                this.user_id = response.json()['id'];
                return this.LOGGED_IN;
            }
        });
    }

    // Nesse caso o user_id vai ser o id do restaurante e recebemos um json do item criado
    static add_item(item){
        return fetch(this.RESTAURANT_ITEMS+`/${this.user_id}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(item)
        }).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if (response.status === 409){
                return this.ALREADY_EXISTS;
            }else if(response.status === 201){
                return response.json();
            }
        });
    }

    // Mesma coisa aqui o user_id vai ser o do restaurante que está loggado 
    static remove_item(item_id){
        return fetch(this.USERS+`/${this.user_id}/${item_id}`,
        {method:'DELETE'}).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if (response.status === 404){
                return this.ALREADY_EXISTS;
            }else if(response.status === 201){
                return this.DELETED_SUCCESSFULLY;
            }
        });
    }

    // Retorna um JSON com todos os items do restaurante
    static get_items(restaurant_id){
        return fetch(this.RESTAURANT_ITEMS+`/${restaurant_id}`,
        {method:'GET'}).then(response => {
            if(response.status === 404){
                return this.NOT_FOUND;
            }else if (response.status === 409){
                return this.ALREADY_EXISTS;
            }else if(response.status === 201){
                return response.json();
            }
        });
    }
    
    // User_id de novo é o id do restaurante loggado para verificar a autorização
    static edit_items(item_id, item){
        return fetch(this.USERS+`/${this.user_id}/${item_id}`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(item)
        }).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if(response.status === 404){
                return this.NOT_FOUND;
            }else if (response.status === 409){
                return this.ALREADY_EXISTS;
            }else if(response.status === 201){
                return response.json();
            }
        });
    }
    
    // Adiciona um novo pedido para um item de um restaurante em nome do usuário
    static add_order(restaurant_id, item_id){
        return fetch(this.ORDERS+`/${restaurant_id}/${item_id}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "user_id":this.user_id 
            })
        }).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if (response.status === 409){
                return this.ALREADY_EXISTS;
            }else if(response.status === 201){
                return response.json();
            }
        });
    }
    
    // Verifica o estado atual do pedido
    static track_order(order_id){
        return fetch(this.ORDERS+`/${order_id}`,{
            method:'GET',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "user_id":this.user_id 
            })
        }).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if(response.status === 404){
                return this.NOT_FOUND;
            }else if(response.status === 201){
                return response.json()["state"];
            }
        });
    }
    
    // Se for o restaurante responsável atualiza o estado do pedido para "em preparo"
    static prepare_order(order_id){
        return fetch(this.ORDERS+`/${order_id}/prepare`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "user_id":this.user_id 
            })
        }).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if(response.status === 404){
                return this.NOT_FOUND;
            }else if(response.status === 201){
                return this.UPDATED;
            }
        });
    }
    
    // Se for o restaurante responsável atualiza o estado do pedido para "à caminho"
    static ship_order(order_id){
        return fetch(this.ORDERS+`/${order_id}/ship`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                "user_id":this.user_id 
            })
        }).then(response => {
            if(response.status === 401){
                return this.INVALID_SESSION;
            }else if(response.status === 404){
                return this.NOT_FOUND;
            }else if(response.status === 201){
                return this.UPDATED;
            }
        });
    }
}