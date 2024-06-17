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

    const pbnSuitOrder = [Suit.SPADES, Suit.HEARTS, Suit.DIAMONDS, Suit.CLUBS]
    const drawHandSuitOrder = [Suit.SPADES, Suit.HEARTS, Suit.CLUBS, Suit.DIAMONDS]

    function getCardsFromPbnNotation(pbnString:string):Card[]{
        const suitSeparated = pbnString.split(".")
        const cardsSeparatedInSuits = new Map<Suit, Card[] >();
        pbnSuitOrder.forEach((suit,index) => {
            const cardsForASuit = suitSeparated[index].split("").map( rankSymbol => { return { "suit":suit, "rank":getRankFromSymbolNonNull(rankSymbol) } } )
            cardsSeparatedInSuits.set(suit,cardsForASuit)
        })
        return drawHandSuitOrder.reduce(
            (accumulator, currentSuit) => accumulator.concat(cardsSeparatedInSuits.get(currentSuit) || []),
            [] as Card[]
          );
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
