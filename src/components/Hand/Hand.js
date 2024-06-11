import './Hand.css';
import Card from "../Card/Card";

export default function Hand({ cards, onClick, id }) {

    function cardClickHandler(cardKey) {
        return () => onClick(cardKey);
    }

    const allCards = cards.map(card => {
        return <li key={card.key} className="cardListItem">
            <Card
                suit={card.suit}
                rank={card.rank}
                onClick={cardClickHandler(card.key)}
            />
        </li>
    });
    return (
        <div className="Hand" id={id}>
            <ol className="handOrderedList">{allCards}</ol>
        </div>
    );
}

