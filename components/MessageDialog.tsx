// MessageDialog.tsx
//
// Displays an information message and an OK button to dismiss. Usage:
//
// <MessageDialog
//     buttonText="OK"
//     ref={messageDialogRef}
// >
//     Your message.
// </MessageDialog>
//
// Reference:
//     https://codeburst.io/creating-a-modal-dialog-with-tailwind-css-42722c9aea4f
//
// Cleve Lendon   2024

import { forwardRef } from "preact/compat";
import { useImperativeHandle, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface Props {
    buttonText: string;
    //onClose: (event: MouseEvent) => void;
    children: ComponentChildren;
}

// deno-lint-ignore no-explicit-any
export const MessageDialog = forwardRef<any, Props>((
    { buttonText, children }: Props,
    ref,
) => {
    //
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // To dismiss the message dialog.
    const dismiss = () => {
        setIsOpen(false);
    };

    // show() - This can be called from the parent to display the dialog.
    // Params:
    //     True = open
    //     False = close
    useImperativeHandle(ref, () => ({
        show(open: boolean) {
            if (open == true) {
                // Focus on dismiss button.
                // This will allow the user to dismiss by typing <enter>.
                // This must be delayed, or it won't work.
                setTimeout(() => {
                    buttonRef?.current?.focus();
                }, 300);
            }
            setIsOpen(open);
        },
    }));

    // If the dialog is closed, return nothing.
    if (!isOpen) return <></>;

    return (
        <div class="fixed pin z-20 overflow-auto rounded flex shadow-xl border-solid border-2 border-gray-300">
            <div class="relative px-5 py-3 bg-white text-lg w-full max-w-md m-auto text-center">
                {children}
                <div class="flex justify-end">
                    <button
                        ref={buttonRef}
                        class="nice-button"
                        onClick={dismiss}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
});
