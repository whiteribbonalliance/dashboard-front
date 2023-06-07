import Select, { MultiValue } from 'react-select'
import React from 'react'
import { Option } from '@types'

interface ISelectMultiValuesProps {
    id: string
    options: (Option<string> | Option<boolean>)[]
    value: string[]
    controllerRenderOnChange: (...event: any[]) => void
    customOnChange: () => void
    handleOnChangeSelectedOptions?:
        | ((options: MultiValue<Option<string>>) => void)
        | ((options: MultiValue<Option<boolean>>) => void)
}

export const SelectMultiValues = ({
    id,
    options,
    value,
    controllerRenderOnChange,
    customOnChange,
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
                    controllerRenderOnChange(multiValueOptions.map((option) => option.value))
                }
                if (handleOnChangeSelectedOptions) handleOnChangeSelectedOptions(multiValueOptions as MultiValue<any>)
                customOnChange()
            }}
        />
    )
}
