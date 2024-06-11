import { useState } from 'react';
import './BiddingBox.css';
export default function BiddingBox({ firstPossibleBid, mayDouble, mayRedouble, parentSubmitHandler }) {

    parentSubmitHandler = (text) => alert("Bidding "+ text)

    const [clickedLevel, setClickedLevel] = useState("P");
    const [clickedStrain, setClickedStrain] = useState("");

    const strainOrder = ["C","D","H","S","N"];
    const levels = ["1", "2", "3", "4", "5", "6", "7"];
    const firstPossibleLevelNumber = parseInt (firstPossibleBid);
    const firstPossibleStrain = firstPossibleBid[1];

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
        setClickedStrain("")
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
            return;
        }
        const upperCaseStrain = strain.toString().toUpperCase();
        const strainIndex = strainOrder.findIndex(value => value===upperCaseStrain)
        if(strainIndex < 0){
            handleLevelPass()
        } else {
            setClickedStrain(upperCaseStrain);
        }
    }
    function handleStrainClickRedirection(strain){
        return () => handleStrainClick(strain);
    }

    
    const numberButtons = levels.map(level => {
        const levelNumber = parseInt (level);
        const isDisabled = (levelNumber < firstPossibleLevelNumber) || (levelNumber === firstPossibleLevelNumber && firstPossibleStrain==="N");
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
            firstEnabledIndex = strainOrder.findIndex(value => value===firstPossibleStrain) + 1;
        }

        return strainOrder.map( (strain,index) => {
            const isDisabled = index < firstEnabledIndex;
            return (<button
                className='strainButton'
                id={"strainButton_"+strain}
                disabled={isDisabled}
                key={strain}
                onClick={isDisabled ? null : handleStrainClickRedirection(strain)}
                selectedstrain={clickedStrain===strain? "true" : "false"}
                >{strain}</button>)
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
            return <></>;
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(clickedLevel==="P" || clickedLevel==="X" || clickedLevel==="XX"){
            parentSubmitHandler(clickedLevel);
        } else {
            parentSubmitHandler(clickedLevel+clickedStrain);
        }
    }
    const submitButton = <button className='submitBid' onClick={submitHandler}>Bid!</button>


    return (
        <div className="BiddingBox">
            <p>Bidding box</p>
            <div className='biddingBox_firstRow'> {passButton} {numberButtons}</div>
            <div className='biddingBox_secondRow'> {penaltyButton()} {getStrainItems(clickedLevel)}</div>
            {submitButton}
        </div>
    );

}
