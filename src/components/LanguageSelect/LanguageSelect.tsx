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

'use client'

import { Fragment } from 'react'
import { LegacyDashboardName } from '@enums'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { classNames, getLanguagesByDashboard } from '@utils'
import { usePathname, useRouter } from 'next/navigation'

interface ILanguageSelectProps {
    dashboard: string
    lang: string
}

type LanguageOption = {
    value: string
    label: string
}

export const LanguageSelect = ({ dashboard, lang }: ILanguageSelectProps) => {
    const router = useRouter()
    const pathname = usePathname()

    // Languages
    const languages = getLanguagesByDashboard(dashboard)

    // Options
    const options = languages.map((language) => {
        const option: LanguageOption = {
            value: language.code,
            label: language.name,
        }

        return option
    })

    // Selected option
    const selectedOption = options.find((option) => option.value === lang)

    // Set listbox button classes
    let listboxButtonClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            listboxButtonClasses =
                'px-1.5 py-1.5 border-pmnchColors-primary text-white hover:bg-pmnchColors-primary xl:text-pmnchColors-primary xl:hover:text-white'
            break
        default:
            listboxButtonClasses =
                'px-1.5 py-1.5 border-defaultColors-primary text-white hover:bg-defaultColors-primary xl:text-defaultColors-primary xl:hover:text-white'
    }

    // Handle language change
    async function handleLanguageChange(option: LanguageOption) {
        if (lang !== option.value) {
            const pathnameWithoutLang = pathname.replace(`/${lang}`, '')
            router.replace(`/${option.value}/${pathnameWithoutLang}`)
        }
    }

    if (!selectedOption) return <div></div>

    return (
        <div className="w-52 text-xl">
            <Listbox value={selectedOption} onChange={handleLanguageChange}>
                <div className="relative">
                    <Listbox.Button
                        className={classNames(
                            'relative w-full cursor-pointer rounded-md border py-2 pl-3 text-left',
                            listboxButtonClasses
                        )}
                    >
                        <div className="flex gap-x-3">
                            <FontAwesomeIcon className="text-3xl" icon={faLanguage} />
                            <span className="block truncate font-bold">{selectedOption.value.toUpperCase()}</span>
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
                                    key={option.value}
                                    className={({ active }) =>
                                        classNames(
                                            'relative cursor-pointer select-none py-2 pl-10 pr-5 text-lg',
                                            active ? 'bg-grayLight' : ''
                                        )
                                    }
                                    value={option}
                                    title={option.label}
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
