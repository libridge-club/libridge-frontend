export default class HTTPClient {

    static SERVER_URL=process.env.REACT_APP_BACKEND_URL

    fetchComplete(url, method, headers, myBody){
        return fetch(url, {
            method,
            headers,
            body: JSON.stringify(myBody)
        }).then(response => {
            // console.log("Success:");
            // console.log(response);
            return response.json();
        })
        .then(data => {
            // console.log('Fetched data:', data);
            return data;
        })
        .catch(error => {
            console.error('ERROR!');
            return console.error(error);
        });
    }

    fetchGet(url){
        return this.fetchComplete(url, "GET", undefined, undefined);
    }

    fetchPut(url, myHeaders, myBody){
        return this.fetchComplete(url, "PUT", myHeaders, myBody);
    }

    getTablesFromServerPromise() {
        const API_ENDPOINT="tables"
        const FULL_URL= HTTPClient.SERVER_URL + API_ENDPOINT 
        return this.fetchGet(FULL_URL);
    }

    async getTables() {
        return this.getTablesFromServerPromise()
            .then(tableList => tableList)
            .catch(error => {
                console.error('ERROR!');
                return console.error(error);
            });
    }

    connectToServerPromise() {
        const CONNECT_ENDPOINT="connect"
        const CONNECT_URL = HTTPClient.SERVER_URL + CONNECT_ENDPOINT 
        return this.fetchGet(CONNECT_URL);
    }

    async connect() {
        return this.connectToServerPromise()
            .then(playerId => playerId)
            .catch(error => {
                console.error('ERROR!');
                return console.error(error);
            });
    }

    putNicknamePromise(playerId, nickname) {
        const CONNECT_ENDPOINT="player/nickname"
        const CONNECT_URL = HTTPClient.SERVER_URL + CONNECT_ENDPOINT
        const myHeaders = {"PlayerUUID": playerId, "Content-Type": "application/json"};
        const myBody = {"content": nickname};
        return this.fetchPut(CONNECT_URL, myHeaders, myBody)
    }

    async putNickname(playerId, nickname){
        return this.putNicknamePromise(playerId, nickname)
            .then(playerInfo => playerInfo)
            .catch(error => {
                console.error('ERROR!');
                return console.error(error);
            });
    }

}