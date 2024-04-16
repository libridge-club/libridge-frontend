import './Card.css';
export default function Card({ suit, rank, onClick }) {
    const filenameBase = 'assets/cards/nicubunu-White-deck-';
    function getSymbolFromRank(rank) {
        const rankToSymbolMap = {
            'TWO': '2',
            'THREE': '3',
            'FOUR': '4',
            'FIVE': '5',
            'SIX': '6',
            'SEVEN': '7',
            'EIGHT': '8',
            'NINE': '9',
            'TEN': '10',
            'JACK': 'Jack',
            'QUEEN': 'Queen',
            'KING': 'King',
            'ACE': 'Ace',
        }
        return rankToSymbolMap[rank];
    }
    function getFilenameFromSuitAndRank(suit, rank) {
        const x = filenameBase + getSymbolFromRank(rank) + '-of-' + suit.toLowerCase() + '.svg';
        return x;
    }
    const altText = 'card ' + rank + ' of ' + suit;
    return (
        <div className="Card" onClick={onClick}>
            <button className="cardButton">{<img src={getFilenameFromSuitAndRank(suit, rank)} className="cardImage" alt={altText.toLowerCase()} height="200px" />}</button>
        </div>
    );

}


