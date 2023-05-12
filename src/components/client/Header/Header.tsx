'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Dashboards } from '@enums'
import { useState } from 'react'

interface IHeaderProps {
    dashboard: string
}

const menuButtons = [
    { id: '1', title: '  [Language selector here]', url: '' },
    { id: '2', title: 'About Us', url: 'https://whiteribbonalliance.org/campaigns/what-women-want' },
    { id: '3', title: 'Show Video', url: 'https://www.youtube.com/watch?v=nBzide5J3Hk' },
]

export const Header = ({ dashboard }: IHeaderProps) => {
    const [displayFiltersPanel, setDisplayfiltersPanel] = useState<boolean>(false)

    // Set mobile dropdown classes
    let mobileDropdownClasses: string
    switch (dashboard) {
        case Dashboards.PMNCH:
            mobileDropdownClasses = 'bg-pmnch-primary-color'
            break
        default:
            mobileDropdownClasses = 'bg-default-primary-color'
    }

    // Set menu button classes
    let menuButtonClasses: string
    switch (dashboard) {
        case Dashboards.PMNCH:
            menuButtonClasses = 'text-pmnch-primary-color hover:bg-pmnch-primary-color border-pmnch-primary-color'
            break
        default:
            menuButtonClasses = 'text-default-primary-color hover:bg-default-primary-color border-default-color'
    }

    return (
        <>
            <Disclosure as="header" className="shadow-gray-200 sticky z-50 shadow-md xl:shadow-none">
                {({ open }) => (
                    <>
                        <div className="flex items-center justify-between py-6 pl-4 pr-7">
                            <div className="flex items-center">
                                {/* Button to display filters panel */}
                                <div
                                    className={`flex cursor-pointer transition duration-100 ease-in-out xl:hidden ${
                                        displayFiltersPanel ? 'rotate-180' : ''
                                    }`}
                                    onClick={() => setDisplayfiltersPanel((prev) => !prev)}
                                >
                                    <FontAwesomeIcon className="text-3xl" icon={faChevronLeft} />
                                    <FontAwesomeIcon className="ml-[-0.6rem] text-3xl" icon={faChevronLeft} />
                                </div>

                                {/* Logo */}
                                <div className="ml-2.5 ">
                                    <Link href={'/'}>
                                        <Image
                                            className="w-full max-w-[17rem]"
                                            src="/www_horizontal_logo.png"
                                            alt="what women want logo"
                                            width={1117}
                                            height={200}
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Menu buttons */}
                            <div className="hidden gap-x-3 xl:flex">
                                {menuButtons.map((menuButton) => {
                                    if (menuButton.url) {
                                        return (
                                            <Link key={menuButton.id} href={menuButton.url} target="_blank">
                                                <button
                                                    className={`flex items-center rounded-md border border-default-font-color px-3 py-2.5 text-xl font-bold ${menuButtonClasses} hover:text-white`}
                                                >
                                                    {menuButton.title}
                                                </button>
                                            </Link>
                                        )
                                    } else {
                                        return (
                                            <button
                                                key={menuButton.id}
                                                className={`flex items-center rounded-md border border-default-font-color px-3 py-2.5 text-xl font-bold ${menuButtonClasses} hover:text-white`}
                                            >
                                                {menuButton.title}
                                            </button>
                                        )
                                    }
                                })}
                            </div>

                            {/* Button to display mobile dropdown */}
                            <Disclosure.Button className="xl:hidden">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <FontAwesomeIcon className="text-4xl" icon={faXmark} />
                                ) : (
                                    <FontAwesomeIcon className="text-3xl" icon={faBars} />
                                )}
                            </Disclosure.Button>
                        </div>

                        {/* Mobile dropdown */}
                        <Transition>
                            <Disclosure.Panel as="ul" className={`${mobileDropdownClasses} absolute w-full xl:hidden`}>
                                {menuButtons.map((menuButton) => {
                                    if (menuButton.url) {
                                        return (
                                            <Link key={menuButton.id} href={menuButton.url} target="_blank">
                                                <li className="cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white hover:text-default-font-color">
                                                    {menuButton.title}
                                                </li>
                                            </Link>
                                        )
                                    } else {
                                        return (
                                            <li
                                                key={menuButton.id}
                                                className="cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white hover:text-default-font-color"
                                            >
                                                {menuButton.title}
                                            </li>
                                        )
                                    }
                                })}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>

            {/* Filters panel */}
            {displayFiltersPanel && (
                <div className="fixed flex min-h-full w-full justify-center bg-white px-2 py-2 xl:hidden">
                    [FILTERS PANEL]
                </div>
            )}
        </>
    )
}
