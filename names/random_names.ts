// random_names.ts
// Functions to generate random names (first_name and family_name).
// Cleve Lendon 2024

import { SimpleName } from "../interfaces/interface.ts";

let firstNames: string[];
let familyNames: string[];

// readNames() - Reads in list of names from files.
function readNames() {
    firstNames = Deno.readTextFileSync("./names/first_names.txt").toString()
        .split("\n");
    familyNames = Deno.readTextFileSync("./names/family_names.txt").toString()
        .split("\n");
}

readNames(); // Read in all the names.

// randomName()
// Generates a random name.
// Returns an object of type SimpleName.
const randomName = (): SimpleName => {
    const indexFirst = Math.floor(Math.random() * firstNames.length);
    const indexFamily = Math.floor(Math.random() * familyNames.length);
    const first = firstNames[indexFirst];
    const family = familyNames[indexFamily];
    const id = crypto.randomUUID();
    return { id: id, firstName: first, familyName: family };
};

// randomNames()
// Gets an array of random names.
// Params:  count - number of names to create
// Return:  array of SimpleName objects
export const randomNames = (count: number): SimpleName[] => {
    const arr: SimpleName[] = [];
    for (let i = 0; i < count; i++) arr.push(randomName());
    return arr;
};
