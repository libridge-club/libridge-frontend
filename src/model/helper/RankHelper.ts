import Rank from "../enums/Rank";

const rankToFilenameTextMap = new Map<Rank, string>([
    [Rank.TWO, '2'],
    [Rank.THREE, '3'],
    [Rank.FOUR, '4'],
    [Rank.FIVE, '5'],
    [Rank.SIX, '6'],
    [Rank.SEVEN, '7'],
    [Rank.EIGHT, '8'],
    [Rank.NINE, '9'],
    [Rank.TEN, '10'],
    [Rank.JACK, 'Jack'],
    [Rank.QUEEN, 'Queen'],
    [Rank.KING, 'King'],
    [Rank.ACE, 'Ace'],
]);
export function getFilenameFromRank(rank:Rank):string {
    return rankToFilenameTextMap.get(rank) ?? "";
}

const rankToDescriptionTextMap = new Map<Rank, string>([
    [Rank.TWO, "Two"],
    [Rank.THREE, "Three"],
    [Rank.FOUR, "Four"],
    [Rank.FIVE, "Five"],
    [Rank.SIX, "Six"],
    [Rank.SEVEN, "Seven"],
    [Rank.EIGHT, "Eight"],
    [Rank.NINE, "Nine"],
    [Rank.TEN, "Ten"],
    [Rank.JACK, "Jack"],
    [Rank.QUEEN, "Queen"],
    [Rank.KING, "King"],
    [Rank.ACE, "Ace"],
]);
export function getDescriptionTextFromRank(rank:Rank):string {
    return rankToDescriptionTextMap.get(rank) ?? "";
}

const symbolToRankMap = new Map<string, Rank>([
    ['2', Rank.TWO],
    ['3', Rank.THREE],
    ['4', Rank.FOUR],
    ['5', Rank.FIVE],
    ['6', Rank.SIX],
    ['7', Rank.SEVEN],
    ['8', Rank.EIGHT],
    ['9', Rank.NINE],
    ['T', Rank.TEN],
    ['J', Rank.JACK],
    ['Q', Rank.QUEEN],
    ['K', Rank.KING],
    ['A', Rank.ACE],
]);
export function getRankFromSymbol(symbol:string):Rank|undefined {
    return symbolToRankMap.get(symbol);
}
export function getRankFromSymbolNonNull(symbol:string):Rank {
    return getRankFromSymbol(symbol) ?? Rank.TWO;
}

const rankToSymbolMap = new Map<Rank, string>([
    [Rank.TWO, '2'],
    [Rank.THREE, '3'],
    [Rank.FOUR, '4'],
    [Rank.FIVE, '5'],
    [Rank.SIX, '6'],
    [Rank.SEVEN, '7'],
    [Rank.EIGHT, '8'],
    [Rank.NINE, '9'],
    [Rank.TEN, 'T'],
    [Rank.JACK, 'J'],
    [Rank.QUEEN, 'Q'],
    [Rank.KING, 'K'],
    [Rank.ACE, 'A'],
]);
export function getSymbolFromRank(rank:Rank):string {
    return rankToSymbolMap.get(rank) ?? "";
}
