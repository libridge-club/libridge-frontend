import './OpeningTrainer.css';
import { useState } from "react";
import BiddingBox from "../BiddingBox/BiddingBox";
import Hand from "../Hand/Hand";
import HTTPClient from "../../HTTPClient";
import PtBr from "../../i18n/PtBr";
import Strain from '../../Strain';

export default function OpeningTrainer() {

    const [handInPbnStringFormat, setHandInPbnStringFormat] = useState("");
    const [expectedCall, setExpectedCall] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    
    const doNothing = () => {}
    
    const myHttpClient = new HTTPClient();
    const messages = new PtBr();

    async function handlerDrawNewBoard(){
        setResultMessage("");
        setHandInPbnStringFormat("");
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
            const formatedExpectedCall = formatBid(expectedCall);
            const formattedBid = formatBid(bid);
            setResultMessage(messages.theExpectedBidWas(formatedExpectedCall, formattedBid));
        }
    }

    function formatBid(bid){
        console.log("Formatting bid:" + bid)
        if(bid==="P"){
            return "PASS";
        }
        if(bid==="X" || bid==="XX"){
            return bid;
        }
        const level = bid[0];
        const strainLetter = bid[1];
        const foundStrain = Strain.findByLetter(strainLetter)
        if(!foundStrain) return ""
        return level + foundStrain.symbol
    }

    return (
        <div className="OpeningTrainer" >
            <div className='OpeningTrainer_Hand'>
                {shouldDrawHand()}
            </div>
            <div className='OpeningTrainer_BiddingBox'>
                {shouldDrawBiddingBox()}
            </div>
            <button className='OpeningTrainer_drawNewBoardButton' onClick={handlerDrawNewBoard}>{messages.drawRandomHand()}</button>
            <div className='OpeningTrainer_resultMessage'>
                <p>{resultMessage}</p>
            </div>
    </div>
    );
}

