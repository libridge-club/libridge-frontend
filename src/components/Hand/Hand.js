import { getRankFromSymbol } from '../../enums/Rank';
import Suit from '../../enums/Suit';
import Card from "../Card/Card";
import './Hand.css';

export default function Hand({ pbnNotationHand, onClick, id }) {

    function cardClickHandler(cardKey) {
        return () => onClick(cardKey);
    }

    function getCardsFromPbnNotation(pbnString){
        if(!pbnString) return;
        const suitSeparated = pbnString.split(".")
        const spadeCards = suitSeparated[0].split("").map( card => { return { "suit":Suit.SPADES, "rank":getRankFromSymbol(card) } } )
        const heartCards = suitSeparated[1].split("").map( card => { return { "suit":Suit.HEARTS, "rank":getRankFromSymbol(card) } } )
        const diamondCards = suitSeparated[2].split("").map( card => { return { "suit":Suit.DIAMONDS, "rank":getRankFromSymbol(card) } } )
        const clubCards = suitSeparated[3].split("").map( card => { return { "suit":Suit.CLUBS, "rank":getRankFromSymbol(card) } } )
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

