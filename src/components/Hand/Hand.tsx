import { MouseEventHandler } from 'react';
import Card from '../../model/Card';
import Suit from '../../model/enums/Suit';
import { getRankFromSymbolNonNull, getSymbolFromRank } from '../../model/helper/RankHelper';
import { getSymbolFromSuit } from '../../model/helper/SuitHelper';
import CardComponent from '../Card/Card';
import './Hand.css';

type Props = {
    pbnNotationHand: string,
    id: string,
    onClick: MouseEventHandler
}

export default function Hand({ pbnNotationHand, onClick, id }: Props) {

    function getCardsFromPbnNotation(pbnString:string):Card[]{
        if(!pbnString) return [];
        const suitSeparated = pbnString.split(".")
        const spadeCards = suitSeparated[0].split("").map( card => { return { "suit":Suit.SPADES, "rank":getRankFromSymbolNonNull(card) } } )
        const heartCards = suitSeparated[1].split("").map( card => { return { "suit":Suit.HEARTS, "rank":getRankFromSymbolNonNull(card) } } )
        const diamondCards = suitSeparated[2].split("").map( card => { return { "suit":Suit.DIAMONDS, "rank":getRankFromSymbolNonNull(card) } } )
        const clubCards = suitSeparated[3].split("").map( card => { return { "suit":Suit.CLUBS, "rank":getRankFromSymbolNonNull(card) } } )
        return spadeCards.concat(heartCards, clubCards, diamondCards);
    }

    const allCards = getCardsFromPbnNotation(pbnNotationHand).map(card => {
        const cardKey = getSymbolFromSuit(card.suit) + getSymbolFromRank(card.rank)

        return <li key={cardKey} className="cardListItem">
            <CardComponent
                card={card}
                onClick={onClick}
            />
        </li>
    });
    return (
        <div className="Hand" id={id}>
            <ol className="handOrderedList">{allCards}</ol>
        </div>
    );
}

