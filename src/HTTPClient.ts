type Options = {
    method?: string;
    headers?: any;
    body?: any
}

class HTTPClient {

    private static readonly SERVER_URL = import.meta.env.VITE_BACKEND_URL ?? ""

    private fetchComplete(url:string, method:string, headers:any, myBody:any){
        console.log("fetching " + url)
        let options:Options = { method }
        if(headers){
            options = { ...options, headers }
        }
        if(myBody){
            options = { ...options, body: JSON.stringify(myBody) }
        }

        return fetch(url, options).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Status code: " + response.status + "\nStatus text: " + response.statusText);
            }
        })
        .catch(error => {
            console.error(error.message);
            return null;
        });
    }

    private fetchGet(url:string){
        return this.fetchComplete(url, "GET", null, null);
    }

    private fetchPut(url:string, myHeaders:any, myBody:any){
        return this.fetchComplete(url, "PUT", myHeaders, myBody);
    }

    public async getTables() {
        const API_ENDPOINT="tables"
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

    public async connect() {
        const CONNECT_ENDPOINT="connect"
        const CONNECT_URL = HTTPClient.SERVER_URL + CONNECT_ENDPOINT 
        return this.fetchGet(CONNECT_URL);
    }


    public async putNickname(playerId:string, nickname:string) {
        const CONNECT_ENDPOINT="player/nickname"
        const CONNECT_URL = HTTPClient.SERVER_URL + CONNECT_ENDPOINT
        const myHeaders = {"PlayerUUID": playerId, "Content-Type": "application/json"};
        const myBody = {"content": nickname};
        return this.fetchPut(CONNECT_URL, myHeaders, myBody)
    }
    
    public async getRandomBoard() {
        const API_ENDPOINT="boards/getRandom"
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

    public async getRandomHandWithCall(avoidPass:boolean) {
        const API_ENDPOINT="openingTrainer/getRandom" + (avoidPass ? "?avoidPass=true" : "")
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

}

export default HTTPClient;