import Suit from "../enums/Suit";

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

const suitToSymbolMap = new Map<Suit, string>([
    [Suit.CLUBS, 'c'],
    [Suit.DIAMONDS, 'd'],
    [Suit.HEARTS, 'h'],
    [Suit.SPADES, 's'],
]);
export function getSymbolFromSuit(suit:Suit):string {
    return suitToSymbolMap.get(suit) ?? "";
}
