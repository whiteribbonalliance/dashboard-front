import React from 'react'

interface IInputProps {
    id: string
    placeHolder: string
    controllerRenderOnChange: (...event: any[]) => void
    onChange?: () => void // A function to run when the value of this input changes
}

export const Input = ({ id, placeHolder, controllerRenderOnChange, onChange }: IInputProps) => {
    return (
        <input
            id={id}
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            type="text"
            placeholder={placeHolder}
            onChange={(value) => {
                controllerRenderOnChange(value)

                if (onChange) {
                    onChange()
                }
            }}
        />
    )
}
