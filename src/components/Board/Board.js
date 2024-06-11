import './Board.css';
import { useState } from "react";
import DoubleDummyTable from "../DoubleDummyTable/DoubleDummyTable";
import Hand from "../Hand/Hand";
import HTTPClient from '../../HTTPClient';
export default function Board() {

    const myHttpClient = new HTTPClient();

    function addKeyToCards(cards) {
        return cards.map(card => {
            return {
                ...card,
                "key": getCardUniqueKey(card)
            }
        })
    }

    async function handlerDrawNewBoard(){
        resetAllHands();
        const randomBoard = await myHttpClient.getRandomBoard();
        setAllHands(randomBoard["board"]["hands"]);
        setDoubleDummyTableValues(randomBoard["doubleDummyTable"])
    }

    function getCardUniqueKey({ suit, rank }) {
        return suit + rank;
    }

    function handleClick(key) {
        removeCard(key);
    }

    function resetAllHands(){
        setCardsNorth([]);
        setCardsEast([]);
        setCardsSouth([]);
        setCardsWest([]);
        setDoubleDummyTableValues([]);
    }

    function setAllHands(hands){
        setCardsNorth(addKeyToCards(hands["NORTH"]["cards"]));
        setCardsEast(addKeyToCards(hands["EAST"]["cards"]));
        setCardsSouth(addKeyToCards(hands["SOUTH"]["cards"]));
        setCardsWest(addKeyToCards(hands["WEST"]["cards"]));
    }

    function removeCard(key) {
        setCardsNorth(cardsNorth.filter((value) => value.key !== key));
        setCardsEast(cardsEast.filter((value) => value.key !== key));
        setCardsSouth(cardsSouth.filter((value) => value.key !== key));
        setCardsWest(cardsWest.filter((value) => value.key !== key));
    }

    const [cardsNorth, setCardsNorth] = useState([]);
    const [cardsEast, setCardsEast] = useState([]);
    const [cardsSouth, setCardsSouth] = useState([]);
    const [cardsWest, setCardsWest] = useState([]);
    const [doubleDummyTableValues, setDoubleDummyTableValues] = useState({});

    return (
        <div className="wholePage">
            <button onClick={handlerDrawNewBoard}>Draw random board</button>
            <div className="Board">
                <div className="topRow">
                    <Hand cards={cardsNorth} onClick={handleClick} id="cardsNorth"/>
                </div>
                <div className="middleRow">
                    <Hand cards={cardsWest} onClick={handleClick} id="cardsWest" />
                    <DoubleDummyTable values={doubleDummyTableValues} onHandleDrawHand={handlerDrawNewBoard}/>
                    <Hand cards={cardsEast} onClick={handleClick} id="cardsEast" />
                </div>
                <div className="bottomRow">
                    <Hand cards={cardsSouth} onClick={handleClick} id="cardsSouth" />
                </div>
                
            </div>
        </div>
    );

}