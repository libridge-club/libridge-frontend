export default class Strain{

    #name
    #symbol
    #color // Unused for now
    #letter

    constructor(name, symbol, color) {
        this.#name = name;
        this.#symbol = symbol;
        this.#color = color;
        this.#letter = name[0];
    }

    static findByLetter(letter){
        return (Object.entries(Strain).map(([key,value]) => value).find(value => value.letter===letter) || null);
    }

    static CLUBS = new Strain("Clubs", '\u2663', "black");
    static DIAMONDS = new Strain("Diamonds", '\u2666', "red");
    static HEARTS = new Strain("Hearts", '\u2665', "red");
    static SPADES = new Strain("Spades", '\u2660', "black");
    static NOTRUMPS = new Strain("No Trumps", 'NT', "black");

    get name() {
        return this.#name;
    }

    get letter() {
        return this.#letter;
    }

    get symbol() {
        return this.#symbol;
    }

    // Method
    equals(strain2) {
        return !strain2 && this.#letter===strain2.letter;
    }
}

