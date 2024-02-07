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

import { LegacyDashboardName } from '@enums'
import { classNames } from '@utils'

interface IButtonProps {
    text: string
    size?: 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
    disabled?: boolean
    dashboard?: string
}

export const Button = ({ text, size = 'text-base', disabled = false, dashboard }: IButtonProps) => {
    // Set button classes
    let buttonClasses: string
    const disabledButtonCommonStyles = 'text-gray border-gray cursor-default'
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            buttonClasses = classNames(
                disabled
                    ? disabledButtonCommonStyles
                    : 'text-pmnchColors-primary border-pmnchColors-primary hover:bg-pmnchColors-primary hover:text-white'
            )
            break
        case LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE:
            buttonClasses = classNames(
                disabled
                    ? disabledButtonCommonStyles
                    : 'text-dataExchangeColors-primary border-dataExchangeColors-primary hover:bg-dataExchangeColors-primary hover:text-white'
            )
            break
        default:
            buttonClasses = classNames(
                disabled
                    ? disabledButtonCommonStyles
                    : 'text-defaultColors-primary border-defaultColors-primary hover:bg-defaultColors-primary hover:text-white'
            )
    }

    return (
        <button
            className={classNames(
                'flex items-center whitespace-nowrap rounded-md border px-3 py-2 font-bold',
                size,
                buttonClasses
            )}
        >
            <div className="flex items-center">{text}</div>
        </button>
    )
}
