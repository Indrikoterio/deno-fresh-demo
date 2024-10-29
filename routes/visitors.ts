// visitors.ts
//
// HTTP handlers to handle requests from the EditableTable.
// Records are saved to or deleted from the KV database.
//
// For testing: In the browser, open http://localhost:8000/visitors
//
// Cleve Lendon  2024
//
import { Handlers } from "$fresh/server.ts";
import { SimpleName } from "../interfaces/interface.ts";
import { getAllNames } from "../db/database.ts";

const kv = await Deno.openKv();
const index = "name";

export const handler: Handlers = {
  // GET - Fetch all records from the database.
  async GET(_req, _ctx) {
    //console.log("Received GET.");
    const names = await getAllNames();
    return new Response(JSON.stringify(names));
  },

  // POST - Add a new name to the kv database.
  async POST(req, _ctx) {
    //console.log("Received POST.");
    const name = (await req.json()) as SimpleName;
    const key = [index, name.id];
    const ok = await kv.atomic().set(key, name).commit();
    if (!ok) throw new Error("POST: It appears that mistakes were made.");
    return new Response(JSON.stringify(name));
  },

  // DELETE - Delete a record from the kv database.
  async DELETE(req, _ctx) {
    //console.log("Received DELETE.");
    const id = (await req.json()) as string;
    const key = [index, id];
    const ok = await kv.atomic().delete(key).commit();
    if (!ok) throw new Error("DELETE: Well I tried.");
    return new Response(JSON.stringify(id));
  },

  // PUT - Update a record from the kv database.
  async PUT(req, _ctx) {
    //console.log("Received PUT.");
    const name = (await req.json()) as SimpleName;
    const key = [index, name.id];
    const ok = await kv.atomic().set(key, name).commit();
    if (!ok) throw new Error("PUT: This wadn't sposta happen.");
    return new Response(JSON.stringify(name));
  },
};
