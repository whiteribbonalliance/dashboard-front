import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

interface IChevronsDownProps {
    open: boolean
}

export const ChevronsDown = ({ open }: IChevronsDownProps) => {
    return (
        <div className={`flex cursor-pointer flex-col transition duration-100 ease-in-out ${open ? 'rotate-180' : ''}`}>
            <FontAwesomeIcon className="text-lg" icon={faChevronDown} />
            <FontAwesomeIcon className="mt-[-0.6rem] text-lg" icon={faChevronDown} />
        </div>
    )
}
