import Select from 'react-select'
import React from 'react'
import { Option } from '@types'

interface ISelectSingleValueProps {
    id: string
    options: Option[]
    value: string | boolean
    onChange: (...event: any[]) => void
    submitData: () => void
}

export const SelectSingleValue = ({ id, options, value, onChange, submitData }: ISelectSingleValueProps) => {
    return (
        <Select
            instanceId={id}
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(SingleValueOption) => {
                if (SingleValueOption) {
                    onChange(SingleValueOption.value)
                }
                submitData()
            }}
        />
    )
}
