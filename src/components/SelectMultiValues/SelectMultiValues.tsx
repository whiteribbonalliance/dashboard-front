import Select from 'react-select'
import React from 'react'
import { Option } from '@types'

interface ISelectMultiValuesProps {
    id: string
    isDisabled?: boolean
    options: (Option<string> | Option<boolean>)[]
    value: string[]
    controllerRenderOnChange: (...event: any[]) => void
    onChange?: () => void // A function to run when the value of this select changes
}

export const SelectMultiValues = ({
    id,
    isDisabled,
    options,
    value,
    controllerRenderOnChange,
    onChange,
}: ISelectMultiValuesProps) => {
    return (
        <Select
            isDisabled={isDisabled}
            isMulti
            instanceId={id}
            options={options}
            value={value.map((selectedVal) => {
                const option = options.find((option) => option.value === selectedVal)
                if (option) return option
            })}
            onChange={(multiValueOptions) => {
                if (multiValueOptions) {
                    controllerRenderOnChange(
                        multiValueOptions.map((option) => {
                            if (option) return option.value
                        })
                    )
                }

                if (onChange) {
                    onChange()
                }
            }}
        />
    )
}
