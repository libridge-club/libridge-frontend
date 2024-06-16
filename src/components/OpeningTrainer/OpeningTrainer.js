import './OpeningTrainer.css';
import { useState } from "react";
import BiddingBox from "../BiddingBox/BiddingBox";
import Hand from "../Hand/Hand";
import HTTPClient from "../../HTTPClient";
import PtBr from "../../i18n/PtBr";
import Strain from '../../Strain';
import { Helmet } from 'react-helmet';

export default function OpeningTrainer() {

    const [handInPbnStringFormat, setHandInPbnStringFormat] = useState("");
    const [expectedCall, setExpectedCall] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const [candidates, setCandidates] = useState([]);
    
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
        setCandidates(randomHandWithCall["candidates"])
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

    function drawCandidates(){
        const benDescription = (
            <div className='OpeningTrainer_benDescription'>
                <a href="https://lorserker.github.io/ben/" target="_blank" rel="noopener noreferrer">{messages.whoIsBen()}</a>
                <span> {messages.benDescription()}</span>
            </div>
        )
        if(candidates.length===0 || !resultMessage){
            return <></>
        } else if (candidates.length===1 && candidates[0]["call"]===expectedCall) {
            return <></>
        } else if (candidates.length===1) {
            return (
                <div className='OpeningTrainer_benCandidates'>
                    <p>Mas o ben discorda. Pra ele, o lance indicado é {formatBid(candidates[0]["call"])}.</p>
                    {benDescription}
                </div>
            )
        }
        else {
            const sortedCandidates = candidates.sort((a,b)=>b["probability"]-a["probability"]);
            const candidatesRender = sortedCandidates.map(candidate => <p>{"Lance: " + formatBid(candidate["call"]) + " com probabilidade " + candidate["probability"]*100 + "%"}</p>);
            return (
                <div className='OpeningTrainer_benCandidates'>
                    <p>Para essa mão, o ben oferece mais de um lance candidato. Eles são:</p>
                    {candidatesRender}
                    {benDescription}
                </div>
            )
        }
    }

    return (
        <div className="OpeningTrainer" >
            <Helmet>
                <meta charSet="utf-8" />
                <title>libridge.club</title>
                <meta name="description" content="libridge.club - Free online Bridge" />
            </Helmet>
            <div className='OpeningTrainer_Hand'>
                {shouldDrawHand()}
            </div>
            <div className='OpeningTrainer_BiddingBox'>
                {shouldDrawBiddingBox()}
            </div>
            <button className='OpeningTrainer_drawNewBoardButton' onClick={handlerDrawNewBoard}>{messages.drawRandomHand()}</button>
            <div className='OpeningTrainer_resultMessage'>
                <p>{resultMessage}</p>
                {drawCandidates()}
            </div>
    </div>
    );
}

