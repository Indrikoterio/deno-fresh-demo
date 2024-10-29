// database.ts
//
// Database functions. This project uses the built-in Key/Value database.
//
// Exports:
//      writeName()
//      getAllNames()
//      deleteAllData()
//
// Cleve Lendon 2024

// A SimpleName consists of an ID, a firstName and a familyName.
import { SimpleName } from "../interfaces/interface.ts";

const kv: Deno.Kv = await Deno.openKv();

// writeName()
// Writes one name record to the db.
// Params:
//     name  (SimpleName)
export async function writeName(name: SimpleName) {
    const result = await kv.set(["name", name.id], name);
    if (!result.ok) {
        throw new Error(
            `There was a problem persisting ${name.firstName} ${name.familyName}`,
        );
    }
} // writeName()

// compareLastNames() - For sorting. Sort by family name.
// Params:
//      name a (SimpleName)
//      name b (SimpleName)
// Return:   -1, 0, 1
function compareLastNames(a: SimpleName, b: SimpleName): number {
    const nameA = a.familyName;
    const nameB = b.familyName;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
}

// getAllNames()
// Reads all 'name' records from the db.
// Return:
//     array of simple names (in a promise)
export async function getAllNames(): Promise<SimpleName[]> {
    // list is an iterator
    const list = kv.list<SimpleName>({ prefix: ["name"] });

    const allNames: SimpleName[] = [];

    // Read the names back.
    for await (const row of list) {
        const rowValue = row.value;
        //console.log(rowValue);
        allNames.push(rowValue);
    }
    return allNames.sort(compareLastNames);
} // getAllNames()

// deleteAllData()
// Deletes all data from the database.
export async function deleteAllData() {
    const entries = kv.list({ prefix: [] });
    if (entries) {
        for await (const entry of entries) {
            if (entry) kv.delete(entry.key);
        }
    }
} // deleteAllData()
