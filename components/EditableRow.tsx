// EditableRow.tsx
//
// This component displays a row of data, with edit and delete buttons.
//
// Reference:
//     Build a Todo App with Deno and Fresh JS
//     https://www.youtube.com/watch?v=86iwjR6fZAg
//
//     Icons from: https://heroicons.com/
//
// Cleve Lendon  2024

import { useRef, useState } from "preact/hooks";
import { SimpleName } from "../interfaces/interface.ts";
import { InputField } from "./InputField.tsx";

interface EditableRowProps {
    name: SimpleName; // id, firstName, familyName
    onEdit: (simpleName: SimpleName) => void;
    onDelete: (simpleName: SimpleName) => void;
}

export function EditableRow(
    { name, onEdit, onDelete }: EditableRowProps,
) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const inputRef2 = useRef<HTMLInputElement | null>(null);

    // handleEdit()
    //
    // Handles form submission in edit mode.
    //
    // Params:
    //     DOM event
    const handleEdit = (event: Event) => {
        //
        event.preventDefault();
        const input1 = inputRef1.current;
        const input2 = inputRef2.current;
        if (input1 && input2) {
            const editedName: SimpleName = {
                id: name.id,
                firstName: input1.value,
                familyName: input2.value,
            };
            onEdit(editedName); // Defined in EditableTable.
            name.firstName = input1.value;
            name.familyName = input2.value;
            setEditMode(() => false);
        } // if
    }; // handleEdit()

    // Delete this row.
    const deleteRow = () => {
        onDelete(name); // Defined in EditableTable.
    };

    return (
        <tr>
            {editMode // True = currently in editing mode.
                ? (
                    <>
                        <td>
                            <form onSubmit={handleEdit}>
                                <InputField
                                    reference={inputRef1}
                                    value={name.firstName}
                                />
                            </form>
                        </td>
                        <td>
                            <form onSubmit={handleEdit}>
                                <InputField
                                    reference={inputRef2}
                                    value={name.familyName}
                                />
                            </form>
                        </td>
                        <td class="px-3">
                            <div class="flex">
                                <button
                                    onClick={() =>
                                        setEditMode((prevState) => !prevState)}
                                    class="edit-button"
                                >
                                    <img src="edit.svg" class="size-6"></img>
                                </button>
                                <button
                                    onClick={() => deleteRow()}
                                    class="edit-button"
                                >
                                    <img src="trash.svg" class="size-6"></img>
                                </button>
                            </div>
                        </td>
                    </>
                )
                : (
                    <>
                        <td class="px-3">{name.firstName}</td>
                        <td class="px-3">{name.familyName}</td>
                        <td class="px-3">
                            <div class="flex">
                                <button
                                    onClick={() =>
                                        setEditMode((prevState) => !prevState)}
                                    class="edit-button"
                                >
                                    <img src="edit.svg" class="size-6"></img>
                                </button>
                                <button
                                    onClick={() => deleteRow()}
                                    class="edit-button"
                                >
                                    <img src="trash.svg" class="size-6"></img>
                                </button>
                            </div>
                        </td>
                    </>
                )}
        </tr>
    );
}
