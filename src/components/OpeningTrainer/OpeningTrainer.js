import './OpeningTrainer.css';
import { useState } from "react";
import BiddingBox from "../BiddingBox/BiddingBox";
import Hand from "../Hand/Hand";
import HTTPClient from "../../HTTPClient";
import PtBr from "../../i18n/PtBr";

export default function OpeningTrainer() {

    const [handInPbnStringFormat, setHandInPbnStringFormat] = useState("");
    const [expectedCall, setExpectedCall] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    
    const doNothing = () => {}
    
    const myHttpClient = new HTTPClient();
    const messages = new PtBr();

    async function handlerDrawNewBoard(){
        setResultMessage("");
        const randomHandWithCall = await myHttpClient.getRandomHandWithCall();
        if(!randomHandWithCall){
            alert(messages.error_failedToConnectToServer());
            return;  
        }
        setHandInPbnStringFormat(randomHandWithCall["hand"]);
        setExpectedCall(randomHandWithCall["call"]);
    }

    function shouldDrawHand(){
        if (handInPbnStringFormat){
            return <Hand pbnNotationHand={handInPbnStringFormat} onClick={doNothing} id="OpeningTrainerHand" />
        }
    }

    function shouldDrawBiddingBox(){
        if (handInPbnStringFormat){
            return <BiddingBox firstPossibleBid="1C" mayDouble="false" mayRedouble="false" parentSubmitHandler={submitHandler}/>
        }
    }

    function submitHandler(bid){
        if(!expectedCall){
            setResultMessage(messages.error_failedToGetBidFromServer());
        }else if(bid===expectedCall){
            setResultMessage(messages.correct());
        } else{
            setResultMessage(messages.theExpectedBidWas(expectedCall, bid));
        }
    }

    function shouldDrawResultMessage(){
        if (resultMessage){
            return <p>{resultMessage}</p>
        }
    }

    return (
        <div className="OpeningTrainer" >
            <button className='OpeningTrainer_drawNewBoardButton' onClick={handlerDrawNewBoard}>{messages.drawRandomHand()}</button>
            <div className='OpeningTrainer_Hand'>
                {shouldDrawHand()}
            </div>
            <div className='OpeningTrainer_BiddingBox'>
                {shouldDrawBiddingBox()}
            </div>
            <div className='OpeningTrainer_resultMessage'>
                {shouldDrawResultMessage()}
            </div>
    </div>
    );
}

