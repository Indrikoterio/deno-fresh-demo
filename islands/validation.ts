// validation.ts
//
// Functions to validate input data.
//
// Cleve Lendon  2024

// checkCharacters
//
// Returns true if the given string (str) contains only unicode
// letters (including accents), spaces, apostrophes (Miles O’Brian),
// and hypens. (Jean-Luc Picard)
//
// Reference:
//     https://dev.to/tillsanders/let-s-stop-using-a-za-z-4a0m
//
// Params:
//      string
// Return:
//      true = OK
export const checkCharacters = (str: string): boolean => {
    const ok = str.match(/^[\s’'\p{Letter}\p{Mark}-]+$/gu);
    if (ok) return true;
    return false;
};

// Nobiliary particles, etc. Eg.:  Ludwig _van_ Beethoven
const nobiliary = [
    "van", // Germanic
    "von",
    "zu",
    "zum",
    "zur",
    "auf",
    "der",
    "de", // French
    "du",
    "des",
    "di", // Italian
    "del",
    "della",
    "dei",
    "dal",
    "dalla",
    "dai",
    "do", // Portuguese
    "dos",
    "da",
    "das",
    "al", // Arabic
    "el",
    "saint", // Saints
    "sainte",
    "san",
    "santa",
    "são",
    "sao",
    "santo",
    "st",
    "ste",
    "sta",
    "st.",
    "ste.",
    "sta.",
];

// validateName
//
// Splits the input string, and checks to make sure that the result
// consists of a first name and a family name. Eg. ['Ryan', 'Dahl']
//
// Checks for nobiliary particles (von, de, etc.)
// Eg. 'Ludwig van Beethoven' will return ['Ludwig', 'van Beethoven']
//
// Params:
//    input string
// Return:
//    array [first name, family name], or null for bad input
//
export const validateName = (str: string): string[] | null => {
    const arr = str.split(" ");
    if (arr.length == 1) return null;

    const firstName = arr[0];

    if (arr.length == 2) {
        const familyName = arr[1];
        return [firstName, familyName];
    }
    if (arr.length == 3) {
        const n2 = arr[1];
        const n3 = arr[2];
        const familyName = n2 + " " + n3;
        if (nobiliary.indexOf(n2.toLowerCase()) > -1) {
            return [firstName, familyName];
        }
        return null;
    }
    if (arr.length == 4) { // van der Waals, etc.
        const n2 = arr[1];
        const n3 = arr[2];
        const n4 = arr[3];
        const familyName = n2 + " " + n3 + " " + n4;
        const lc1 = n2.toLowerCase();
        const lc2 = n3.toLowerCase();
        if (lc1 == "van") {
            if (lc2 == "de" || lc2 == "der" || lc2 == "den") {
                return [firstName, familyName];
            }
        }
        if (lc1 == "von") {
            if (lc2 == "der" || lc2 == "dem") {
                return [firstName, familyName];
            }
        }
        if (lc1 == "de" && lc2 == "la") return [firstName, familyName];
    }
    return null;
};
