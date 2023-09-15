import React from "react";

type Props = {
    open: boolean
    children: React.ReactNode
    close: () => void
}

export const Dialog = ({children, open}: Props) => {
    return (
        <dialog className="modal z-10" open={open}>
            <div className="modal-box">
                {children}
            </div>
        </dialog>
    )
}
