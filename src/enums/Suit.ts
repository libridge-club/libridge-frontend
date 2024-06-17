enum Suit {
    CLUBS,
    DIAMONDS,
    HEARTS,
    SPADES,
}

const suitToDescriptionTextMap = new Map<Suit, string>([
    [Suit.CLUBS, 'clubs'],
    [Suit.DIAMONDS, 'diamonds'],
    [Suit.HEARTS, 'hearts'],
    [Suit.SPADES, 'spades'],
]);
export function getDescriptionTextFromSuit(suit:Suit):string {
    return suitToDescriptionTextMap.get(suit) ?? "";
}
export function getFilenameFromSuit(suit:Suit):string {
    return suitToDescriptionTextMap.get(suit) ?? "";
}

export default Suit