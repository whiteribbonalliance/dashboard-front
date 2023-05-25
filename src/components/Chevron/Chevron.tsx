import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

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
            className={`flex ${divWrapperClasses} cursor-pointer transition duration-100 ease-in-out ${
                rotate ? 'rotate-180' : ''
            }`}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} />
            {double && <FontAwesomeIcon className={`${secondIconClasses}`} icon={icon} />}
        </div>
    )
}
