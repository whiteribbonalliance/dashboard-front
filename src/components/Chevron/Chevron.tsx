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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { classNames } from '@utils'

interface IDoubleChevronsProps {
    direction: 'up' | 'down' | 'left' | 'right'
    rotate?: boolean
    double?: boolean
    onClick?: () => void
}

export const Chevron = ({ direction, rotate, double, onClick }: IDoubleChevronsProps) => {
    let icon: IconDefinition
    let secondIconClasses: string
    let divWrapperClasses: string
    switch (direction) {
        case 'up':
            icon = faChevronUp
            secondIconClasses = 'mt-[-50%]'
            divWrapperClasses = 'flex-col items-center'
            break
        case 'down':
            icon = faChevronDown
            secondIconClasses = 'mt-[-50%]'
            divWrapperClasses = 'flex-col items-center'
            break
        case 'left':
            icon = faChevronLeft
            secondIconClasses = 'ml-[-20%]'
            divWrapperClasses = 'flex-row justify-center'
            break
        case 'right':
            icon = faChevronRight
            secondIconClasses = 'ml-[-20%]'
            divWrapperClasses = 'flex-row justify-center'
            break
        default:
            icon = faChevronUp
            secondIconClasses = 'mt-[-45%]'
            divWrapperClasses = 'flex-col items-center'
    }

    return (
        <div
            className={classNames(
                'flex cursor-pointer transition duration-100 ease-in-out',
                divWrapperClasses,
                rotate ? 'rotate-180' : ''
            )}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} />
            {double && <FontAwesomeIcon className={`${secondIconClasses}`} icon={icon} />}
        </div>
    )
}
