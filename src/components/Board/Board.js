import { useEffect, useState } from "react";
import Hand from "../Hand/Hand";
export default function Board() {
    function getHandFromServerPromise() {
        console.log("Calling fetch");
        return fetch('http://164.90.254.243:8080/randomHand')
            .then(response => {
                // console.log("Success:");
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log('Fetched data:', data);
                return data.cards;
            })
            .catch(error => {
                console.error('ERROR!');
                console.error(error);
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
        function addKeyToCards(cards) {
            return cards.map(card => {
                return {
                    ...card,
                    "key": getCardUniqueKey(card)
                }
            })
        }
        async function startFetching() {
            getHandFromServerPromise().then(cards => {
                if (!ignore) {
                    const cardsArrayWithKey = addKeyToCards(cards)
                    console.log("Setting new cards!");
                    setCards(cardsArrayWithKey);
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

    function handleDrawHand() {
        setCards([]);
        getHandFromServerPromise().then((cards) => {
            console.log("Setting new cards!");
            setCards(addKeyToCards(cards));
        });
    }

    function removeCard(key) {
        setCards(cards.filter((value) => value.key !== key));
    }

    const [cards, setCards] = useState([]);

    return (
        <div className="Board">
            <button onClick={handleDrawHand}>Draw hand</button>
            <Hand cards={cards} onClick={handleClick} />
        </div>
    );

}