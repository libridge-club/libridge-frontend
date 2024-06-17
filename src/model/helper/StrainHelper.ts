import Strain from "../enums/Strain";

const strainToNameMap = new Map<Strain, string>([
    [Strain.CLUBS, 'Clubs'],
    [Strain.DIAMONDS, 'Diamonds'],
    [Strain.HEARTS, 'Hearts'],
    [Strain.SPADES, 'Spades'],
    [Strain.NOTRUMPS, 'No Trumps']
]);
export function getNameFromStrain(strain:Strain):string {
    return strainToNameMap.get(strain) ?? "";
}

const strainToSymbolMap = new Map<Strain, string>([
    [Strain.CLUBS, '\u2663'],
    [Strain.DIAMONDS, '\u2666'],
    [Strain.HEARTS, '\u2665'],
    [Strain.SPADES, '\u2660'],
    [Strain.NOTRUMPS, 'NT']
]);
export function getSymbolFromStrain(strain:Strain):string {
    return strainToSymbolMap.get(strain) ?? "";
}

export function getStrainFromLetter(letter:string){
    if(letter.length!==1) return null;
    const upperCaseLetter = letter.toUpperCase();
    for (const [key, value] of strainToNameMap.entries()) {
        if(value.charAt(0)===upperCaseLetter){
            return key;
        }
    }
    return null;
}
export function getLetterFromStrain(strain:Strain):string{
    return strainToNameMap.get(strain)?.charAt(0) ?? "";
}

export function getStrainOrder():Strain[]{
    return [Strain.CLUBS, Strain.DIAMONDS, Strain.HEARTS, Strain.SPADES, Strain.NOTRUMPS];
}