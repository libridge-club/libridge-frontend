import { MouseEventHandler } from 'react';
import Rank, { getDescriptionTextFromRank, getFilenameFromRank } from '../../enums/Rank';
import Suit, { getDescriptionTextFromSuit, getFilenameFromSuit } from '../../enums/Suit';
import './Card.css';

type Props = {
    suit: Suit,
    rank: Rank,
    onClick: MouseEventHandler
  }

export default function Card({ suit, rank, onClick }: Props) {
    const altText = 'card ' + getDescriptionTextFromRank(rank) + ' of ' + getDescriptionTextFromSuit(suit);
    const filenameBase = 'assets/cards/nicubunu-White-deck-';
    const filenameSrc = filenameBase + getFilenameFromRank(rank) + '-of-' + getFilenameFromSuit(suit) + '.svg';
    return (
        <div className="Card" onClick={onClick}>
            <button className="cardButton">{<img src={filenameSrc} className="cardImage" alt={altText.toLowerCase()} height="200px" />}</button>
        </div>
    );

}


