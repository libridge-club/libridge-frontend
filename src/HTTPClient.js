export default class HTTPClient {

    static SERVER_URL=process.env.REACT_APP_BACKEND_URL

    fetchComplete(url, method, headers, myBody){
        return fetch(url, {
            method,
            headers,
            body: JSON.stringify(myBody)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Status code: " + response.status + "\nStatus text: " + response.statusText);
            }
        })
        .catch(error => {
            console.error(error.message);
            return "";
        });
    }

    fetchGet(url){
        return this.fetchComplete(url, "GET", undefined, undefined);
    }

    fetchPut(url, myHeaders, myBody){
        return this.fetchComplete(url, "PUT", myHeaders, myBody);
    }

    async getTables() {
        const API_ENDPOINT="tables"
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

    async connect() {
        const CONNECT_ENDPOINT="connect"
        const CONNECT_URL = HTTPClient.SERVER_URL + CONNECT_ENDPOINT 
        return this.fetchGet(CONNECT_URL);
    }


    async putNickname(playerId, nickname) {
        const CONNECT_ENDPOINT="player/nickname"
        const CONNECT_URL = HTTPClient.SERVER_URL + CONNECT_ENDPOINT
        const myHeaders = {"PlayerUUID": playerId, "Content-Type": "application/json"};
        const myBody = {"content": nickname};
        return this.fetchPut(CONNECT_URL, myHeaders, myBody)
    }
    
    async getRandomBoard() {
        const API_ENDPOINT="boards/getRandom"
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

    async getExpectedBid(boardId) {
        const API_ENDPOINT="openingTrainer/" + boardId + "/NORTH"
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

}