import { FormEvent, useState } from 'react';
import PtBr from '../../i18n/PtBr';
import Strain from '../../model/enums/Strain';
import { getLetterFromStrain, getStrainFromLetter, getStrainOrder, getSymbolFromStrain } from '../../model/helper/StrainHelper';
import './BiddingBox.css';

type Props = {
    firstPossibleBid:string,
    mayDouble:boolean,
    mayRedouble:boolean,
    parentSubmitHandler: (a: string) => void
}

const doNothing = () => {}

export default function BiddingBox({ firstPossibleBid, mayDouble, mayRedouble, parentSubmitHandler }:Props) {

    const [clickedLevel, setClickedLevel] = useState<string>("P");
    const [clickedStrain, setClickedStrain] = useState<Strain|null>(null);

    const strainOrder = getStrainOrder();
    const levels = ["1", "2", "3", "4", "5", "6", "7"];
    const firstPossibleLevelNumber = parseInt (firstPossibleBid);
    const firstPossibleStrain = getStrainFromLetter(firstPossibleBid[1]);

    const messages = new PtBr();

    function handleLevelClick(levelParam:string) {
        const level = parseInt(levelParam);
        if(level>=firstPossibleLevelNumber){
            setClickedLevel(levelParam);
        } else if(levelParam==="X"){
            setClickedLevel("X");
        } else if(levelParam==="XX"){
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
    function handleLevelClickRedirection(number:string){
        return () => handleLevelClick(number);
    }

    function handleStrainClick(strain:Strain) {
        if(clickedLevel==="P" || clickedLevel==="X" || clickedLevel==="XX"){
            handleLevelPass()
        } else {
            setClickedStrain(strain);
        }
    }
    function handleStrainClickRedirection(strain:Strain){
        return () => handleStrainClick(strain);
    }

    
    const numberButtons = levels.map(level => {
        const levelNumber = parseInt (level);
        const isDisabled = (levelNumber < firstPossibleLevelNumber) || (levelNumber === firstPossibleLevelNumber && Strain.NOTRUMPS===firstPossibleStrain);
        const selectedLevel = clickedLevel===level? "true" : "false";
        return (<button
            className='biddingBox_numberButton'
            id={"NumberButton_"+level}
            disabled={isDisabled}
            onClick={isDisabled ? doNothing : handleLevelClickRedirection(level)}
            key={level}
            data-selectedlevel={selectedLevel}
            >{level}</button>)
    });

    function getStrainItems(level:string) {
        if(level===null || level==="" || level==="P" || level==="X" || level==="XX"){
            return <></>;
        }
        const levelNumber = parseInt (level);
        if(levelNumber===0 || isNaN(levelNumber)){
            return <></>;
        }
        let firstEnabledIndex = 0;
        const LAST_INDEX = strainOrder.length;
        if(levelNumber<firstPossibleLevelNumber){
            firstEnabledIndex = LAST_INDEX + 1;
        } else if(levelNumber===firstPossibleLevelNumber){
            firstEnabledIndex = strainOrder.findIndex(value => value===firstPossibleStrain);
        }

        return strainOrder.map( (strain,index) => {
            const isDisabled = index < firstEnabledIndex;
            const strainLetter = getLetterFromStrain(strain);
            return (<button
                className='strainButton'
                id={"strainButton_"+strainLetter}
                disabled={isDisabled}
                key={strainLetter}
                onClick={isDisabled ? doNothing : handleStrainClickRedirection(strain)}
                data-selectedstrain={(clickedStrain===strain)? "true" : "false"}
                >{getSymbolFromStrain(strain)}</button>)
        })
    }

    const passButton = <button
        className='biddingBox_passButton'
        key="pass"
        data-selectedlevel={clickedLevel==="P"? "true" : "false"}
        onClick={handleLevelPass}
        >PASS</button>
    const doubleButton = <button
        className='biddingBox_doubleButton'
        key="double"
        data-selectedlevel={clickedLevel==="X"? "true" : "false"}
        onClick={handleLevelDouble}
        >X</button>
    const redoubleButton = <button
        className='biddingBox_redoubleButton'
        key="redouble"
        data-selectedlevel={clickedLevel==="XX"? "true" : "false"}
        onClick={handleLevelRedouble}
        >XX</button>
    const penaltyButton = () => {
        if(mayDouble){
            return doubleButton;
        } else if(mayRedouble){
            return redoubleButton;
        } else {
            return <p />; // FIXME This is to avoid the empty row collapsing. There should be a better way to handle this in css.
        }
    }

    function isPassOrPenalty(){
        return clickedLevel==="P" || clickedLevel==="X" || clickedLevel==="XX";
    }

    const submitHandler = (event:FormEvent) => {
        event.preventDefault();
        if(isPassOrPenalty()){
            parentSubmitHandler(clickedLevel);
        } else if(clickedStrain==null){
            parentSubmitHandler("P");
        } else {
            parentSubmitHandler(clickedLevel+getLetterFromStrain(clickedStrain));
        }
    }

    function drawSubmitButton(){
        const isDisabled = !isPassOrPenalty() && clickedStrain==null
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
