import { useState } from "react";
import BiddingBox from "../BiddingBox/BiddingBox";
import Hand from "../Hand/Hand";
import HTTPClient from "../../HTTPClient";

export default function OpeningTrainer() {

    const [currentListOfCards, setCurrentListOfCards] = useState([]);
    const [expectedBid, setExpectedBid] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    
    const doNothing = () => {}
    
    const myHttpClient = new HTTPClient();

    async function handlerDrawNewBoard(){
        const randomBoard = await myHttpClient.getRandomBoard();
        console.log(randomBoard);
        const boardId = randomBoard["board"]["id"]
        setCurrentListOfCards( addKeyToCards(randomBoard["board"]["hands"]["NORTH"]["cards"] ));
        const expectedBidFromServer = await myHttpClient.getExpectedBid(boardId);
        setExpectedBid(expectedBidFromServer);
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
            setResultMessage("Failed to get expected bid from server :(");
        }else if(bid===expectedBid){
            setResultMessage("Correct!");
        } else{
            setResultMessage("The expected bid was " + expectedBid + " but you bid " + bid);
        }
    }

    return (
        <div className="OpeningTrainer" >
            <button onClick={handlerDrawNewBoard}>Draw random board</button>
            {shouldDrawHandAndBiddingBox()}
            {shouldDrawResultMessage()}
    </div>
    );
}

