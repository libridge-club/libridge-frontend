import { useState } from "react";
import LobbyScreen from "../Screens/LobbyScreen/LobbyScreen";
import ConnectToServerScreen from "../Screens/ConnectToServerScreen/ConnectToServerScreen";
import HTTPClient from "../../HTTPClient";

export default function Client() {

    const ALL_STATES = Object.freeze({
        CONNECT_TO_SERVER_SCREEN: Symbol.for("CONNECT_TO_SERVER_SCREEN"),
        LOBBY_SCREEN: Symbol.for("LOBBY_SCREEN")
    });
    
    const [currentState, setCurrentState] = useState(ALL_STATES.CONNECT_TO_SERVER_SCREEN);
    const [playerId, setPlayerId] = useState("");
    const [playerNickname, setPlayerNickname] = useState("");
    const [tableList, setTableList] = useState([]);

    const myHttpClient = new HTTPClient();
    
    async function onConnect (formNickname){
        const playerId = await myHttpClient.connect();
        setPlayerId(playerId);
        // myHttpClient.connect().then(playerId => setPlayerId(playerId)) // why this doesn't work?
        if(playerId){
            setCurrentState(ALL_STATES.LOBBY_SCREEN);
            const playerInfo = await myHttpClient.putNickname(playerId, formNickname);
            setPlayerNickname(playerInfo.nickname);
        }
        const tableList = await myHttpClient.getTables();
        setTableList(tableList);
    }

    const connectToServerJSX = <ConnectToServerScreen submitHandler={(onConnect)}/>

    function returnScreenToDrawBasedOnState(){
        if(currentState === ALL_STATES.LOBBY_SCREEN){
            return <LobbyScreen tableList={tableList} />
        } else {
            return connectToServerJSX
        }
    }

    return (
        <div className="ClientScreen">
            <p>Current state: {currentState.toString()}</p>
            <p>Current player id is: {playerId}</p>
            <p>Current player nickname is: {playerNickname}</p>
            {returnScreenToDrawBasedOnState()}
        </div>
    );

}
