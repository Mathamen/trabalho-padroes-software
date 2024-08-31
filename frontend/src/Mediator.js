export class Mediator{
    static ONLINE = 0;
    static OFFLINE = 1;
    static SERVER_ERROR = 2;
    static USER_NOT_FOUND = 3;
    static PASSWORD_INCORRECT = 4;
    static ALREADY_EXISTS = 5;
    static INVALID_SESSION = 6;
    static DELETED_SUCCESSFULLY = 7;
    static ORDERS = "http://localhost:8000";
    static RESTAURANT_ITEMS = "http://localhost:8001";
    static USERS = "http://localhost:8002";
    static sessionToken = ""; 

    static ping(url){
        return fetch(url).then(response => {
            console.log(`ping ${url}:`);
            if (response.status === 200) {
              return this.ONLINE;
            } else {
              return this.SERVER_ERROR;
            }
        })
        .catch(()=>{return this.OFFLINE});
    }
    //TO DO: consertar todas as funções abaixo e implementar no back 
    static async login(credential, password){
        let result;
        fetch(this.USERS+`/${credential}`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                'password': password
            })
        }).then(response => {
            if (response.status === 404){
                result = this.USER_NOT_FOUND;
            }else if(response.status === 401){
                result = this.PASSWORD_INCORRECT;
            }else if(response.status === 200){
                result = response.json();
                this.sessionToken = result['sessionToken'];
            }
        });
        return result;
    }
    
    static async register(credential, password){
        let result;
        fetch(this.USERS+`/${credential}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                'password':password
            })
        }).then(response => {
            if (response.status === 409){
                result = this.ALREADY_EXISTS;
            }else if(response.status === 201){
                result = response.json();
            }
        });
        return result;
    }
    
    static async add_item(item){
        let result;
        fetch(this.USERS+`/${this.sessionToken}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(item)
        }).then(response => {
            if(response.status === 404){
                result = this.INVALID_SESSION;
            }else if (response.status === 409){
                result = this.ALREADY_EXISTS;
            }else if(response.status === 201){
                result = response.json();
            }
        });
        return result;
    }
    
    static async remove_item(item_id){
        let result;
        fetch(this.USERS+`/${this.sessionToken}/${item_id}`,
        {method:'DELETE'}).then(response => {
            if(response.status === 401){
                result = this.INVALID_SESSION;
            }else if (response.status === 404){
                result = this.ALREADY_EXISTS;
            }else if(response.status === 201){
                result = this.DELETED_SUCCESSFULLY;
            }
        });
        return result;
    }
    
    static async get_items(restaurant_id){
        let result;
        fetch(this.USERS+`/${this.sessionToken}/${restaurant_id}`,
        {method:'GET'}).then(response => {
            if(response.status === 404){
                result = this.SESSION_EXPIRED;
            }else if (response.status === 409){
                result = this.USER_ALREADY_EXISTS;
            }else if(response.status === 201){
                result = response.json();
            }
        });
        return result;
    }
    
    static async edit_items(){}
    
    static async tracking(){}
    
    static async add_order(){}
    
    static async prepare_order(){}
    
    static async ship_order(){}
    
    static async sleep_order(){}
}