'use client'

import { Fragment, useState } from 'react'
import { DashboardName } from '@enums'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { classNames } from '@utils'

interface ILanguageSelectProps {
    dashboard: string
}

type Option = {
    id: string
    value: string
    label: string
}

const options: Option[] = [
    { id: 'en', value: 'en', label: 'English' },
    { id: 'es', value: 'es', label: 'Spanish' },
    { id: 'nl', value: 'nl', label: 'Dutch' },
]

export const LanguageSelect = ({ dashboard }: ILanguageSelectProps) => {
    const [selectedOption, setSelectedOption] = useState<Option>(options[0])

    // Set listbox button classes
    let listboxButtonClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            listboxButtonClasses =
                'px-1.5 py-1.5 border-pmnchColors-primary text-white hover:bg-pmnchColors-primary xl:text-pmnchColors-primary xl:hover:text-white'
            break
        default:
            listboxButtonClasses =
                'px-1.5 py-1.5 border-defaultColors-primary text-white hover:bg-defaultColors-primary xl:text-defaultColors-primary xl:hover:text-white'
    }

    return (
        <div className="w-44 text-xl">
            <Listbox value={selectedOption} onChange={setSelectedOption}>
                <div className="relative">
                    <Listbox.Button
                        className={classNames(
                            'relative w-full cursor-pointer rounded-md border py-[0.55rem] pl-3 text-left',
                            listboxButtonClasses
                        )}
                    >
                        <div className="flex gap-x-3">
                            <FontAwesomeIcon className="text-3xl" icon={faLanguage} />
                            <span className="block truncate font-bold">{selectedOption.label}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        </div>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-grayLight' : ''
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={classNames('block truncate', selected ? 'font-bold' : '')}>
                                                {option.label}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
