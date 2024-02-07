/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import Select from 'react-select'
import React from 'react'
import { TOption } from '@types'

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
