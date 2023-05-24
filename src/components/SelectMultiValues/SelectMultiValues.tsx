import Select, { MultiValue } from 'react-select'
import React from 'react'
import { Option } from '@types'

interface ISelectMultiValuesProps {
    id: string
    options: Option[]
    value: string[]
    onChange: (...event: any[]) => void
    submitData: () => void
    handleOnChangeSelectedOptions?: (options: MultiValue<Option>) => void
}

export const SelectMultiValues = ({
    id,
    options,
    value,
    onChange,
    submitData,
    handleOnChangeSelectedOptions,
}: ISelectMultiValuesProps) => {
    return (
        <Select
            isMulti
            instanceId={id}
            options={options}
            value={value.map((selectedVal) => {
                const option = options.find((option) => option.value === selectedVal) || {
                    value: '',
                    label: '',
                }
                return { value: option.value, label: option.label }
            })}
            onChange={(multiValueOptions) => {
                if (multiValueOptions) {
                    onChange(multiValueOptions.map((option) => option.value))
                }
                if (handleOnChangeSelectedOptions) handleOnChangeSelectedOptions(multiValueOptions)
                submitData()
            }}
        />
    )
}
