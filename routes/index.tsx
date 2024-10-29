// index.tsx
//
// This is the landing page.
// It displays a header and a table of random names.
//
// Cleve Lendon   2024-10

import { randomNames } from "../names/random_names.ts";
//import { deleteAllData, writeName } from "../db/database.ts";
import { EditableTable } from "../islands/EditableTable.tsx";

export default function Home() {
  // Delete all data from the database.
  //deleteAllData(); // import from ..db/database.ts

  // Create some random names. For testing purposes.
  //const names = randomNames(8); // Import randomNames() from ../names/random_names.ts
  // Write the random names to the kv database.
  // Import writeName() from ..db/database.ts
  //for (let i = 0; i < names.length; i++) writeName(names[i]);

  return (
    <div class="px-4 py-4 mx-auto">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h2 class="text-3xl mb-2">Visitors</h2>
        <EditableTable />
      </div>
    </div>
  );
}
