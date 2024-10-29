// EditableTable.tsx
//
// This component (OK, island) displays a scrollable list of names.
// Data is fetched from the KV database using GET and new entries are
// added with POST.
//
// Cleve Lendon  2024

import { useEffect, useRef, useState } from "preact/hooks";
import { SimpleName } from "../interfaces/interface.ts";
import { formatEditableRow, formatEditableRows } from "./formatting.tsx";
import { MessageDialog } from "../components/MessageDialog.tsx";
import { checkCharacters, validateName } from "./validation.ts";
import { VNode } from "preact";

export const EditableTable = () => {
    //
    const MAX_ROWS = 1000;
    const serverURL = "http://localhost:8000/visitors";
    // Input - for entering new rows
    const inputRef = useRef<HTMLInputElement | null>(null);
    // tbody - holds all rows in a <table>
    const tbodyRef = useRef<HTMLTableSectionElement | null>(null);
    // Dialog references
    // deno-lint-ignore no-explicit-any
    const tableFullDialogRef = useRef<any>(null);
    // deno-lint-ignore no-explicit-any
    const twoNamesDialogRef = useRef<any>(null);
    // deno-lint-ignore no-explicit-any
    const invalidCharsDialogRef = useRef<any>(null);

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8",
    };

    const [rows, setRows] = useState<VNode[]>([]); // Rows of data.

    useEffect(() => {
        fetchData();
    }, []);

    // onNewEntry()
    //
    // When a new visitor name is entered in the input field, this
    // function splits the name into first name and family name, then
    // calls createNewVisitor() to POST the data to the server.
    //
    // Params:
    //     DOM event
    const onNewEntry = (event: Event) => {
        event.preventDefault();

        if (rows.length >= MAX_ROWS) {
            tableFullDialogRef?.current?.show(true);
            return;
        }

        if (inputRef.current) {
            const str = inputRef.current.value;
            // Check for invalid characters.
            if (!checkCharacters(str)) {
                invalidCharsDialogRef?.current?.show(true);
                return;
            }
            const name: string[] | null = validateName(str);
            if (name) {
                createNewVisitor(name[0], name[1]);
                inputRef.current.value = "";
            } else {
                twoNamesDialogRef?.current?.show(true);
            }
        }
    };

    // scrollToLast()
    //
    // New entries are added to the end of the table.
    // This function scrolls to the last item in the list.
    //
    // Params:
    //      tbody element
    const scrollToLast = (ele: HTMLTableSectionElement) => {
        const child = ele.querySelector("table tr:last-child");
        if (child) {
            child.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    // createNewVisitor
    //
    // Create a new name object (SimpleName) and send it to the server
    // via POST. If the POST is successful, add the name to the end
    // of the visitor table and scroll to the end.
    //
    // Params:
    //    first name (string)
    //    family name (string)
    function createNewVisitor(firstName: string, familyName: string) {
        const method = "POST";

        // Make an name object.
        const newName: SimpleName = {
            id: crypto.randomUUID(),
            firstName: firstName,
            familyName: familyName,
        };

        const body = JSON.stringify(newName);
        const opts = { method: method, headers: headers, body: body };

        fetch(serverURL, opts).then((response) => {
            console.log("Request complete! response:", response);

            // The POST was successful. Now write the posted data to the table.
            if (tbodyRef) {
                const newRow = formatEditableRow(newName, onEdit, onDelete);
                const newRows = [...rows, newRow];
                setRows(newRows);
                const ele = tbodyRef.current;
                if (ele) {
                    // Alas, updating the DOM takes time.
                    setTimeout(function () {
                        scrollToLast(ele);
                    }, 100); // 100 milliseconds
                }
            }
        }, (error) => {
            console.log(error);
        });
    } // createNewVisitor()

    // Fetch visitor data (names) from the KV database.
    // If the GET request is successful, call setRows(data).
    const fetchData = () => {
        const method = "GET";

        const opts = { method: method, headers: headers };
        fetch(serverURL, opts)
            .then((response) => {
                return response.json();
            })
            .then((data) => setRows(formatEditableRows(data, onEdit, onDelete)))
            .catch((error) => console.log(error));
    }; // fetchData

    const onEdit = (name: SimpleName) => {
        const method = "PUT";

        const body = JSON.stringify(name);
        const opts = { method: method, headers: headers, body: body };

        fetch(serverURL, opts).then((response) => {
            console.log("Request complete! response:", response);
            // The PUT was successful. Now update the table.
            //fetchData();
        }, (error) => {
            console.log(error);
        });
    };

    const onDelete = (name: SimpleName) => {
        const method = "DELETE";

        const body = JSON.stringify(name.id);
        const opts = { method: method, headers: headers, body: body };

        fetch(serverURL, opts).then((response) => {
            console.log("Request complete! response:", response);
            // The DELETE was successful. Now update the table.
            fetchData();
        }, (error) => {
            console.log(error);
        });
    };

    return (
        <>
            <MessageDialog
                buttonText="OK"
                ref={tableFullDialogRef}
            >
                The table is full. Delete rows and try again.
            </MessageDialog>
            <MessageDialog
                buttonText="OK"
                ref={twoNamesDialogRef}
            >
                Please enter a first name and a family name.
            </MessageDialog>
            <MessageDialog
                buttonText="OK"
                ref={invalidCharsDialogRef}
            >
                Invalid characters in name.
            </MessageDialog>
            <div class="table-div">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Family Name</th>
                            <th>Row count: {rows.length}</th>
                        </tr>
                    </thead>
                    <tbody ref={tbodyRef}>{rows}</tbody>
                </table>
            </div>
            <div class="mt-7 ml-7 mx-auto w-full">
                <form onSubmit={onNewEntry}>
                    <label for="input-field">
                        Enter new visitor: &nbsp;
                    </label>
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="First name and last name."
                        class="edit-field"
                    >
                    </input>
                </form>
            </div>
        </>
    );
};
