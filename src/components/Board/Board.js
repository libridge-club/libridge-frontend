import { useEffect, useState } from "react";
import DoubleDummyTable from "../DoubleDummyTable/DoubleDummyTable";
import Hand from "../Hand/Hand";
export default function Board() {

    function getBoardEntityFromServerPromise() {
        // console.log("Calling fetch");
        return fetch('http://localhost:8080/randomBoard')
            .then(response => {
                // console.log("Success:");
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log('Fetched data:', data);
                return data;
            })
            .catch(error => {
                // console.error('ERROR!');
                return console.error(error);
            });
    }

    function addKeyToCards(cards) {
        return cards.map(card => {
            return {
                ...card,
                "key": getCardUniqueKey(card)
            }
        })
    }

    useEffect(() => {
        let ignore = false;
        async function startFetching() {
            getBoardEntityFromServerPromise().then(outsideBoard => {
                console.log("BoardEntity from server");
                console.log(outsideBoard);
                if (!ignore) {
                    console.log("Setting new cards!");
                    setAllHands(outsideBoard["board"]["hands"])
                    console.log("Setting double dummy values:")
                    console.log(outsideBoard["doubleDummyTable"])
                    setDoubleDummyTableValues(outsideBoard["doubleDummyTable"])
                }
            });
        }

        startFetching();

        return () => {
            ignore = true;
        };
    }, []);

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

    function handleDrawHand() {
        resetAllHands();
        getBoardEntityFromServerPromise().then((outsideBoard) => {
            console.log("Setting new cards!");
            console.log(outsideBoard);
            setAllHands(outsideBoard["board"]["hands"]);
            console.log("Setting double dummy values:")
            console.log(outsideBoard["doubleDummyTable"])
            setDoubleDummyTableValues(outsideBoard["doubleDummyTable"])
        });
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
        <div className="Board">
            <button onClick={handleDrawHand}>Draw hand</button>
            <Hand cards={cardsNorth} onClick={handleClick} />
            <Hand cards={cardsEast} onClick={handleClick} />
            <Hand cards={cardsSouth} onClick={handleClick} />
            <Hand cards={cardsWest} onClick={handleClick} />
            <DoubleDummyTable values={doubleDummyTableValues} />
        </div>
    );

}