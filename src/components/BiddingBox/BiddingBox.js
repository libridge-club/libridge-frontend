import { useState } from 'react';
import './BiddingBox.css';
import PtBr from '../../i18n/PtBr';
export default function BiddingBox({ firstPossibleBid, mayDouble, mayRedouble, parentSubmitHandler }) {

    const [clickedLevel, setClickedLevel] = useState("P");
    const [clickedStrain, setClickedStrain] = useState(null);

    const Strain = {
        CLUBS: { "name":"Clubs", "letter":"C", "symbol":'\u2663', "color":"black" },
        DIAMONDS: { "name":"Diamonds", "letter":"D", "symbol":'\u2666', "color":"red" },
        HEARTS: { "name":"Hearts", "letter":"H", "symbol":'\u2665', "color":"red" },
        SPADES: { "name":"Spades", "letter":"S", "symbol":'\u2660', "color":"black" },
        NOTRUMPS: { "name":"No Trumps", "letter":"N", "symbol":'NT', "color":"black" }
    };
    const strainOrder = [Strain.CLUBS, Strain.DIAMONDS, Strain.HEARTS, Strain.SPADES, Strain.NOTRUMPS];
    const levels = ["1", "2", "3", "4", "5", "6", "7"];
    const firstPossibleLevelNumber = parseInt (firstPossibleBid);
    const firstPossibleStrain = Object.entries(Strain).map(([key,value]) => value).find(value => value.letter===firstPossibleBid[1]) || null;

    const messages = new PtBr();

    

    function handleLevelClick(level) {
        if(level>=firstPossibleLevelNumber){
            setClickedLevel(level);
        } else if(level==="X"){
            setClickedLevel("X");
        } else if(level==="XX"){
            setClickedLevel("XX");
        }
        else {
            setClickedLevel("P");
        }
        setClickedStrain(null)
    }
    const handleLevelPass = () => {
        handleLevelClick("P");
    }
    const handleLevelDouble = () => {
        handleLevelClick("X");
    }
    const handleLevelRedouble = () => {
        handleLevelClick("XX");
    }
    function handleLevelNumber(number){
        return () => handleLevelClick(number);
    }

    function handleStrainClick(strain) {
        if(!strain || clickedLevel==="P" || clickedLevel==="X" || clickedLevel==="XX"){
            handleLevelPass()
        } else {
            setClickedStrain(strain);
        }
    }
    function handleStrainClickRedirection(strain){
        return () => handleStrainClick(strain);
    }

    
    const numberButtons = levels.map(level => {
        const levelNumber = parseInt (level);
        const isDisabled = (levelNumber < firstPossibleLevelNumber) || (levelNumber === firstPossibleLevelNumber && firstPossibleStrain===Strain.NOTRUMPS);
        return (<button
            className='biddingBox_numberButton'
            id={"NumberButton_"+level}
            disabled={isDisabled}
            onClick={isDisabled ? null : handleLevelNumber(level)}
            key={level}
            selectedlevel={clickedLevel===level? "true" : "false"}
            >{level}</button>)
    });

    function getStrainItems(level) {
        if(level===null || level==="" || level==="P" || level==="X" || level==="XX"){
            return <></>;
        }
        const levelNumber = parseInt (level);
        if(level===0 || isNaN(level)){
            return <></>;
        }
        let firstEnabledIndex = 0;
        const LAST_INDEX = strainOrder.length;
        if(levelNumber<firstPossibleLevelNumber){
            firstEnabledIndex = LAST_INDEX + 1;
        } else if(levelNumber===firstPossibleLevelNumber){
            firstEnabledIndex = strainOrder.findIndex(value => value.letter===firstPossibleStrain.letter);
        }

        return strainOrder.map( (strain,index) => {
            const isDisabled = index < firstEnabledIndex;
            return (<button
                className='strainButton'
                id={"strainButton_"+strain.letter}
                disabled={isDisabled}
                key={strain.letter}
                onClick={isDisabled ? null : handleStrainClickRedirection(strain)}
                selectedstrain={(clickedStrain && clickedStrain.letter===strain.letter)? "true" : "false"}
                >{strain.symbol}</button>)
        })
    }

    const passButton = <button
        className='biddingBox_passButton'
        key="pass"
        selectedlevel={clickedLevel==="P"? "true" : "false"}
        onClick={handleLevelPass}
        >PASS</button>
    const doubleButton = <button
        className='biddingBox_doubleButton'
        key="double"
        selectedlevel={clickedLevel==="X"? "true" : "false"}
        onClick={handleLevelDouble}
        >X</button>
    const redoubleButton = <button
        className='biddingBox_redoubleButton'
        key="redouble"
        selectedlevel={clickedLevel==="XX"? "true" : "false"}
        onClick={handleLevelRedouble}
        >XX</button>
    const penaltyButton = () => {
        const mayDoubleBoolean = mayDouble.toLowerCase()==="true";
        const mayRedoubleBoolean = mayRedouble.toLowerCase()==="true";
        if(mayDoubleBoolean){
            return doubleButton;
        } else if(mayRedoubleBoolean){
            return redoubleButton;
        } else {
            return <p />; // FIXME This is to avoid the empty row collapsing. There should be a better way to handle this in css.
        }
    }

    function isPassOrPenalty(bid){
        return clickedLevel==="P" || clickedLevel==="X" || clickedLevel==="XX";
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(isPassOrPenalty(clickedLevel)){
            parentSubmitHandler(clickedLevel);
        } else if(!clickedStrain){
            parentSubmitHandler("P");
        } else {
            parentSubmitHandler(clickedLevel+clickedStrain.letter);
        }
    }

    function drawSubmitButton(){
        const isDisabled = !isPassOrPenalty(clickedLevel) && !clickedStrain
        return <button
            className='biddingBox_bidButton'
            onClick={submitHandler}
            disabled={isDisabled}
            >{messages.bid()}</button>
    }


    return (
        <div className="BiddingBox">
            <div className='biddingBox_rows'>
                <div className='biddingBox_firstRow'>{passButton} {numberButtons}</div>
                <div className='biddingBox_secondRow'>{penaltyButton()} {getStrainItems(clickedLevel)}</div>
                <div className='biddingBox_thirdRow'>{drawSubmitButton()}</div>
            </div>
        </div>
    );

}
