'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { HeaderLogos } from 'components/HeaderLogos'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Dashboards } from '@enums'
import React, { useState } from 'react'
import { Button } from '@components/Button/Button'
import { FiltersPanel } from '@components/FiltersPanel'
import { LanguageSelect } from '@components/LanguageSelect'
import { Title } from 'components/Title'

interface IHeaderProps {
    dashboard: string
}

interface IChevronsLeftProps {
    open: boolean
}

interface IHamburgerMenuProps {
    open: boolean
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
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            mobileDropdownClasses = 'bg-pmnch-colors-primary'
            break
        default:
            mobileDropdownClasses = 'bg-default-colors-primary'
    }

    // Set menu button item classes
    let menuButtonItemClasses: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            menuButtonItemClasses = 'hover:text-pmnch-colors-font'
            break
        default:
            menuButtonItemClasses = 'hover:text-default-colors-font'
    }

    return (
        <>
            <Disclosure as="header" className="sticky top-0 z-50 bg-white shadow-md xl:static xl:shadow-none">
                {({ open }) => (
                    <>
                        <div className="flex items-center justify-between px-7 py-6">
                            <div className="flex items-center">
                                {/* Button to display filters panel */}
                                <div onClick={() => setShowFiltersPanel((prev) => !prev)}>
                                    <ChevronsLeft open={showFiltersPanel} />
                                </div>

                                {/* Logo */}
                                <div className="mx-3 flex items-center xl:mx-0">
                                    <HeaderLogos dashboard={dashboard} />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="hidden xl:flex">
                                <Title dashboard={dashboard} renderAsDiv />
                            </div>

                            {/* Menu items */}
                            <nav className="hidden gap-x-3 xl:flex">
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
                            </nav>

                            {/* Button to display mobile dropdown */}
                            <Disclosure.Button className="xl:hidden">
                                <span className="sr-only">Open mobile menu dropdown</span>
                                <HamburgerMenu open={open} />
                            </Disclosure.Button>
                        </div>

                        {/* Mobile dropdown */}
                        <Transition>
                            <Disclosure.Panel as="nav">
                                <ul
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
                                </ul>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>

            {/* Filters panel */}
            {showFiltersPanel && (
                // height = 100vh - (height of header)
                <div className="fixed flex h-[calc(100vh-96px)] w-full flex-col overflow-y-auto bg-white px-8 pb-3 pt-6 xl:hidden">
                    <FiltersPanel dashboard={dashboard} />
                </div>
            )}
        </>
    )
}

const ChevronsLeft = ({ open }: IChevronsLeftProps) => {
    return (
        <div
            className={`flex cursor-pointer transition duration-100 ease-in-out xl:hidden ${open ? 'rotate-180' : ''}`}
        >
            <FontAwesomeIcon className="text-3xl" icon={faChevronLeft} />
            <FontAwesomeIcon className="ml-[-0.6rem] text-3xl" icon={faChevronLeft} />
        </div>
    )
}

const HamburgerMenu = ({ open }: IHamburgerMenuProps) => {
    return <FontAwesomeIcon className={open ? 'text-4xl' : 'text-3xl'} icon={open ? faXmark : faBars} />
}
