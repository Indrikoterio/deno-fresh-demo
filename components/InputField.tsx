// InputField.tsx
//
// A text input field, used in EditableRow.tsx
//
// Cleve Lendon   2024

import { MutableRef } from "preact/hooks";

interface InputFieldProps {
    reference: MutableRef<HTMLInputElement | null>;
    value: string;
}

export function InputField(
    { reference, value }: InputFieldProps,
) {
    return (
        <input
            type="text"
            ref={reference}
            value={value}
            class="edit-field"
        />
    );
}
