import { useCallback, useMemo, useState } from "react";
import { Helmet } from 'react-helmet';
import HTTPClient from "../../HTTPClient";
import PtBr from "../../i18n/PtBr";
import BiddingBox from "../BiddingBox/BiddingBox";
import Hand from "../Hand/Hand";
import './OpeningTrainer.css';
import { getStrainFromLetter, getSymbolFromStrain } from "../../model/helper/StrainHelper";

export default function OpeningTrainer() {

    const [handInPbnStringFormat, setHandInPbnStringFormat] = useState("");
    const [expectedCall, setExpectedCall] = useState<string>("");
    const [resultMessage, setResultMessage] = useState<string>("");
    const [candidates, setCandidates] = useState<any[]>([]);
    
    const doNothing = () => {}
    const messages = useMemo(() => new PtBr(), []);
    const myHttpClient = useMemo(() => new HTTPClient(), []);
    
    const handleSubmitForm = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault();
        setResultMessage("");
        setHandInPbnStringFormat("");
        const avoidPassCheckbox = (event.currentTarget.elements.namedItem('OpeningTrainer_avoidPassCheckbox') as HTMLInputElement).checked;
        const callApiAndUpdateState = async (avoidPassCheckbox:boolean) => {
            const randomHandWithCall = await myHttpClient.getRandomHandWithCall(avoidPassCheckbox);
            if(!randomHandWithCall){
                alert(messages.error_failedToConnectToServer());
                return;
            }
            setHandInPbnStringFormat(randomHandWithCall["hand"]);
            setExpectedCall(randomHandWithCall["call"]);
            setCandidates(randomHandWithCall["candidates"])
        }
        callApiAndUpdateState(avoidPassCheckbox);
    }, [setResultMessage, setHandInPbnStringFormat, setExpectedCall, setCandidates, messages, myHttpClient])

    function shouldDrawHand(){
        if (handInPbnStringFormat){
            return <Hand pbnNotationHand={handInPbnStringFormat} onClick={doNothing} id="OpeningTrainerHand" />
        }
    }

    function shouldDrawBiddingBox(){
        if (handInPbnStringFormat){
            return <BiddingBox firstPossibleBid="1C" mayDouble={false} mayRedouble={false} parentSubmitHandler={submitHandler}/>
        }
    }

    function submitHandler(bid:string){
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

    function formatBid(bid:string){
        if(bid==="P"){
            return "PASS";
        }
        if(bid==="X" || bid==="XX"){
            return bid;
        }
        const level = bid[0];
        const strainLetter = bid[1];
        const foundStrain = getStrainFromLetter(strainLetter);
        if(foundStrain==null) return ""
        return level + getSymbolFromStrain(foundStrain);
    }

    function drawCandidates(){
        const benDescription = (
            <div className='OpeningTrainer_benDescription'>
                <a href="https://lorserker.github.io/ben/" target="_blank" rel="noopener noreferrer">{messages.whoIsBen()}</a>
                <span> {messages.benDescription()}</span>
            </div>
        )
        if(!candidates || candidates.length===0 || !resultMessage){
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
            <form className='OpeningTrainer_form' method="get" onSubmit={handleSubmitForm}>
                <button className='OpeningTrainer_drawNewBoardButton' type="submit">
                    {messages.drawRandomHand()}
                </button>
                <label>
                    <input type="checkbox" name="OpeningTrainer_avoidPassCheckbox" defaultChecked={false} />{messages.avoidPassHands()}
                </label>
            </form>
            <div className='OpeningTrainer_resultMessage'>
                <p>{resultMessage}</p>
                {drawCandidates()}
            </div>
    </div>
    );
}

