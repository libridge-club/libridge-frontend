import './Hand.css';
import Card from "../Card/Card";

export default function Hand({ pbnNotationHand, onClick, id }) {

    const rankToSymbolMap = {
        '2': 'TWO',
        '3': 'THREE',
        '4': 'FOUR',
        '5': 'FIVE',
        '6': 'SIX',
        '7': 'SEVEN',
        '8': 'EIGHT',
        '9': 'NINE',
        'T': 'TEN',
        'J': 'JACK',
        'Q': 'QUEEN',
        'K': 'KING',
        'A': 'ACE',
    }

    function cardClickHandler(cardKey) {
        return () => onClick(cardKey);
    }

    function getCardsFromPbnNotation(pbnString){
        if(!pbnString) return;
        const suitSeparated = pbnString.split(".")
        const spadeCards = suitSeparated[0].split("").map( card => { return { "suit":"SPADES", "rank":rankToSymbolMap[card] } } )
        const heartCards = suitSeparated[1].split("").map( card => { return { "suit":"HEARTS", "rank":rankToSymbolMap[card] } } )
        const diamondCards = suitSeparated[2].split("").map( card => { return { "suit":"DIAMONDS", "rank":rankToSymbolMap[card] } } )
        const clubCards = suitSeparated[3].split("").map( card => { return { "suit":"CLUBS", "rank":rankToSymbolMap[card] } } )
        return spadeCards.concat(heartCards, clubCards, diamondCards);
    }

    const allCards = getCardsFromPbnNotation(pbnNotationHand).map(card => {
        const cardKey = card.suit + card.rank
        return <li key={cardKey} className="cardListItem">
            <Card
                suit={card.suit}
                rank={card.rank}
                onClick={cardClickHandler(cardKey)}
            />
        </li>
    });
    return (
        <div className="Hand" id={id}>
            <ol className="handOrderedList">{allCards}</ol>
        </div>
    );
}

