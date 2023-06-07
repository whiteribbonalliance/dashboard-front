import Select from 'react-select'
import React from 'react'
import { Option } from '@types'

interface ISelectSingleValueProps {
    id: string
    options: Option<string | boolean>[]
    value: string | boolean
    controllerRenderOnChange: (...event: any[]) => void
    customOnChange: () => void
}

export const SelectSingleValue = ({
    id,
    options,
    value,
    controllerRenderOnChange,
    customOnChange,
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
                customOnChange()
            }}
        />
    )
}
