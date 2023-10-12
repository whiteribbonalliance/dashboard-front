import Select from 'react-select'
import React from 'react'
import { TOption } from '@types'
import placeholder from 'lodash/fp/placeholder'

interface ISelectMultiValuesProps {
    id: string
    isDisabled?: boolean
    options: (TOption<string> | TOption<boolean>)[]
    value: string[]
    controllerRenderOnChange: (...event: any[]) => void
    onChange?: () => void // A function to run when the value of this select changes
    placeHolder?: string
}

export const SelectMultiValues = ({
    id,
    isDisabled,
    options,
    value,
    controllerRenderOnChange,
    onChange,
    placeHolder = 'Select...',
}: ISelectMultiValuesProps) => {
    return (
        <Select
            placeholder={placeHolder}
            menuPosition="fixed"
            isDisabled={isDisabled}
            isMulti
            instanceId={id}
            options={options}
            formatOptionLabel={(option) => {
                if (option) {
                    const metadata = option.metadata
                    if (metadata && metadata === 'is_parent') {
                        return <span className="font-bold">{option.label}</span>
                    } else {
                        return <span>{option.label}</span>
                    }
                }
            }}
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
