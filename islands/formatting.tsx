// formatting.tsx
//
// Functions for formatting table rows.
//
// Cleve Lendon 2024

import { SimpleName } from "../interfaces/interface.ts";
import { EditableRow } from "../components/EditableRow.tsx";
import { VNode } from "preact";

// formatEditableRows()
//
// Format array of data into editable rows, by calling formatEditableRow().
//
// Params:
//     array of SimpleNames
//     onEdit function
//     onDelete function
// Return:
//     array of VNodes
export const formatEditableRows = (
    names: SimpleName[],
    onEdit: (name: SimpleName) => void,
    onDelete: (name: SimpleName) => void,
): VNode[] => {
    const editableRows: VNode[] = [];
    names.map((name: SimpleName) => {
        const row = formatEditableRow(name, onEdit, onDelete);
        editableRows.push(row);
    });
    return editableRows;
}; // formatEditableRows

// formatEditableRow()
//
// Formats one editable row of data. The component EditableRow produces;
// <tr><td>Ryan</td><td>Dahl</td><td>Edit</td><td>Delete</td></tr>
//
// Params:
//     name (SimpleName)
//     onEdit function
//     onDelete function
// Return:
//     a VNode
export const formatEditableRow = (
    name: SimpleName,
    onEdit: (name: SimpleName) => void,
    onDelete: (name: SimpleName) => void,
): VNode => {
    return <EditableRow name={name} onEdit={onEdit} onDelete={onDelete} />;
}; // formatEditableRow
