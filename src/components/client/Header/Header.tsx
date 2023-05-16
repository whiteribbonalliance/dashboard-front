'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { HeaderLogos } from '@components/server/HeaderLogos'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Dashboards } from '@enums'
import React, { useState } from 'react'
import { Button } from '@components/server/Button/Button'
import { FiltersPanel } from '@components/client/FiltersPanel'
import { LanguageSelect } from '@components/client/LanguageSelect'
import { Title } from '@components/server/Title'

interface IHeaderProps {
    dashboard: string
}

const menuItems = [
    { id: 'about-us', title: 'About Us', url: 'https://whiteribbonalliance.org/campaigns/what-women-want' },
    { id: 'show-video', title: 'Show Video', url: 'https://www.youtube.com/watch?v=nBzide5J3Hk' },
]

export const Header = ({ dashboard }: IHeaderProps) => {
    const [showFiltersPanel, setShowFiltersPanel] = useState<boolean>(false)

    // Set mobile dropdown classes
    let mobileDropdownClasses: string
    switch (dashboard) {
        case Dashboards.PMNCH:
            mobileDropdownClasses = 'bg-pmnch-colors-primary'
            break
        default:
            mobileDropdownClasses = 'bg-default-colors-primary'
    }

    // Set menu button item classes
    let menuButtonItemClasses: string
    switch (dashboard) {
        case Dashboards.PMNCH:
            menuButtonItemClasses = 'hover:text-pmnch-colors-font'
            break
        default:
            menuButtonItemClasses = 'hover:text-default-colors-font'
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
                                        showFiltersPanel ? 'rotate-180' : ''
                                    }`}
                                    onClick={() => setShowFiltersPanel((prev) => !prev)}
                                >
                                    <FontAwesomeIcon className="text-3xl" icon={faChevronLeft} />
                                    <FontAwesomeIcon className="ml-[-0.6rem] text-3xl" icon={faChevronLeft} />
                                </div>

                                {/* Logo */}
                                <div className="ml-3 flex items-center">
                                    <HeaderLogos dashboard={dashboard} />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="hidden xl:flex">
                                <Title dashboard={dashboard} />
                            </div>

                            {/* Menu items */}
                            <div className="hidden gap-x-3 xl:flex">
                                <LanguageSelect dashboard={dashboard} />
                                {menuItems.map((item) => {
                                    if (item.url) {
                                        return (
                                            <Link key={item.id} href={item.url} target="_blank">
                                                <Button dashboard={dashboard} text={item.title} />
                                            </Link>
                                        )
                                    } else {
                                        return <Button dashboard={dashboard} key={item.id} text={item.title} />
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
                            <Disclosure.Panel
                                as="ul"
                                className={`absolute flex w-full flex-col items-center justify-center shadow-md xl:hidden ${mobileDropdownClasses}`}
                            >
                                <div className="mt-3">
                                    <LanguageSelect dashboard={dashboard} />
                                </div>
                                {menuItems.map((item) => {
                                    if (item.url) {
                                        return (
                                            <div key={item.id} className="w-full">
                                                <Link href={item.url} target="_blank">
                                                    <li
                                                        className={`cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white ${menuButtonItemClasses}`}
                                                    >
                                                        {item.title}
                                                    </li>
                                                </Link>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={item.id} className="w-full">
                                                <li
                                                    key={item.id}
                                                    className={`cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white ${menuButtonItemClasses}`}
                                                >
                                                    {item.title}
                                                </li>
                                            </div>
                                        )
                                    }
                                })}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>

            {/* Filters panel */}
            {showFiltersPanel && <FiltersPanel />}
        </>
    )
}
