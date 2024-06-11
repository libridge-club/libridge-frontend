import { useState } from "react";
import BiddingBox from "../BiddingBox/BiddingBox";
import Hand from "../Hand/Hand";
import HTTPClient from "../../HTTPClient";
import PtBr from "../../i18n/PtBr";

export default function OpeningTrainer() {

    const [currentListOfCards, setCurrentListOfCards] = useState([]);
    const [expectedBid, setExpectedBid] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    
    const doNothing = () => {}
    
    const myHttpClient = new HTTPClient();
    const messages = new PtBr();

    async function handlerDrawNewBoard(){
        const randomBoard = await myHttpClient.getRandomBoard();
        if(!randomBoard){
            alert(messages.error_failedToConnectToServer());
            return;  
        } 
        console.log(randomBoard);
        const boardId = randomBoard["id"]
        setCurrentListOfCards( addKeyToCards(randomBoard["board"]["hands"]["NORTH"]["cards"] ));
        const expectedBidFromServer = await myHttpClient.getExpectedBid(boardId);
        if(!expectedBidFromServer){
            alert(messages.error_failedToConnectToServer());
            return;  
        } 
        setExpectedBid(expectedBidFromServer["call"]["call"]);
        setResultMessage("");
    }

    function addKeyToCards(cards) {
        return cards.map(card => {
            return {
                ...card,
                "key": getCardUniqueKey(card)
            }
        })
    }
    
    function getCardUniqueKey({ suit, rank }) {
        return suit + rank;
    }

    function shouldDrawHandAndBiddingBox(){
        if ((!Array.isArray(currentListOfCards) || !currentListOfCards.length)){
            return <></>
        } else {
            return <><Hand cards={currentListOfCards} onClick={doNothing} id="OpeningTrainerHand" />
                    <BiddingBox firstPossibleBid="1C" mayDouble="false" mayRedouble="false" parentSubmitHandler={submitHandler}/></>
        }
    }

    function shouldDrawResultMessage(){
        if (!resultMessage){
            return <></>
        } else {
            return <p>{resultMessage}</p>
        }
    }

    function submitHandler(bid){
        if(!expectedBid){
            setResultMessage(messages.error_failedToGetBidFromServer());
        }else if(bid===expectedBid){
            setResultMessage(messages.correct());
        } else{
            setResultMessage(messages.theExpectedBidWas(expectedBid, bid));
        }
    }

    return (
        <div className="OpeningTrainer" >
            <button onClick={handlerDrawNewBoard}>{messages.drawRandomHand()}</button>
            {shouldDrawHandAndBiddingBox()}
            {shouldDrawResultMessage()}
    </div>
    );
}

