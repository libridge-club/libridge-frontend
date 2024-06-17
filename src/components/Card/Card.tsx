import { MouseEventHandler } from 'react';
import Card from '../../model/Card';
import { getDescriptionTextFromRank, getFilenameFromRank } from '../../model/helper/RankHelper';
import { getDescriptionTextFromSuit, getFilenameFromSuit } from '../../model/helper/SuitHelper';
import './Card.css';

type Props = {
    card: Card,
    onClick: MouseEventHandler
}

export default function CardComponent({ card, onClick }: Props) {
    const suit = card.suit;
    const rank = card.rank;
    const altText = 'card ' + getDescriptionTextFromRank(rank) + ' of ' + getDescriptionTextFromSuit(suit);
    const filenameBase = 'assets/cards/nicubunu-White-deck-';
    const filenameSrc = filenameBase + getFilenameFromRank(rank) + '-of-' + getFilenameFromSuit(suit) + '.svg';
    return (
        <div className="Card" onClick={onClick}>
            <button className="cardButton">{<img src={filenameSrc} className="cardImage" alt={altText.toLowerCase()} height="200px" />}</button>
        </div>
    );

}


