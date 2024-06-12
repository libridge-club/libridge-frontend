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

    function shouldDrawHandAndBiddingBox(){
        if (!handInPbnStringFormat){
            return <></>
        } else {
            return <><Hand pbnNotationHand={handInPbnStringFormat} onClick={doNothing} id="OpeningTrainerHand" />
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
        if(!expectedCall){
            setResultMessage(messages.error_failedToGetBidFromServer());
        }else if(bid===expectedCall){
            setResultMessage(messages.correct());
        } else{
            setResultMessage(messages.theExpectedBidWas(expectedCall, bid));
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

