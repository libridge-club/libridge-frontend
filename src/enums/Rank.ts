enum Rank {
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE,
}

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

export default Rank