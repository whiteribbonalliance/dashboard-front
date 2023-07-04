import Select from 'react-select'
import React from 'react'
import { Option } from '@types'

interface ISelectSingleValueProps {
    id: string
    options: Option<string | boolean>[]
    value: string | boolean
    controllerRenderOnChange: (...event: any[]) => void
    onChangeEffect?: () => void // A function to run when the value of this select changes
}

export const SelectSingleValue = ({
    id,
    options,
    value,
    controllerRenderOnChange,
    onChangeEffect,
}: ISelectSingleValueProps) => {
    return (
        <Select
            instanceId={id}
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(SingleValueOption) => {
                if (SingleValueOption) {
                    controllerRenderOnChange(SingleValueOption.value)
                }

                if (onChangeEffect) {
                    onChangeEffect()
                }
            }}
        />
    )
}
