'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { HeaderLogos } from 'components/HeaderLogos'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import { DashboardName } from '@enums'
import React, { ReactElement, useState } from 'react'
import { Button } from '@components/Button/Button'
import { FiltersPanel } from '@components/FiltersPanel'
import { LanguageSelect } from '@components/LanguageSelect'
import { Chevron } from '@components/Chevron'
import { classNames, getDashboardConfig } from '@utils'
import { useTranslation } from '@app/i18n/client'
import { Dashboard } from '@types'

interface IHeaderProps {
    dashboard: Dashboard
    lang: string
    title: ReactElement
}

interface IHamburgerMenuProps {
    open: boolean
}

export const Header = ({ dashboard, lang, title }: IHeaderProps) => {
    const [showMobileFiltersPanel, setShowMobileFiltersPanel] = useState<boolean>(false)
    const config = getDashboardConfig(dashboard)
    const { t } = useTranslation(lang)

    const showVideoLink = config.showVideoLink

    // Set about us text
    let aboutUsText: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            aboutUsText = `${t('about')} PMNCH`
            break
        default:
            aboutUsText = t('about-us')
    }

    // Create menu items
    const menuItems = [
        { id: 'about-us', title: aboutUsText, url: 'https://whiteribbonalliance.org/campaigns/what-women-want' },
        { id: 'show-video', title: t('show-video'), url: showVideoLink },
    ]

    // Set mobile dropdown classes
    let mobileDropdownClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            mobileDropdownClasses = 'bg-pmnchColors-primary'
            break
        default:
            mobileDropdownClasses = 'bg-defaultColors-primary'
    }

    // Set menu button item classes
    let menuButtonItemClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            menuButtonItemClasses = 'hover:text-pmnchColors-font'
            break
        default:
            menuButtonItemClasses = 'hover:text-defaultColors-font'
    }

    return (
        <>
            <Disclosure as="header" className="sticky top-0 z-50 bg-white shadow-md xl:static xl:shadow-none">
                {({ open }) => (
                    <>
                        <div className="flex items-center justify-between px-7 py-7">
                            <div className="flex items-center">
                                {/* Button to display filters panel */}
                                <div onClick={() => setShowMobileFiltersPanel((prev) => !prev)} title="Filters">
                                    <div className="flex text-3xl xl:hidden">
                                        <Chevron direction="left" double={true} rotate={showMobileFiltersPanel} />
                                    </div>
                                </div>

                                {/* Logo */}
                                <div className="mx-3 flex items-center xl:mx-0">
                                    <HeaderLogos dashboard={dashboard} />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="hidden xl:flex">{title}</div>

                            {/* Menu items */}
                            <nav className="hidden gap-x-3 xl:flex">
                                <LanguageSelect dashboard={dashboard} lang={lang} />
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
                            <Disclosure.Button className="xl:hidden" title="Menu">
                                <HamburgerMenu open={open} />
                            </Disclosure.Button>
                        </div>

                        {/* Mobile dropdown */}
                        <Transition>
                            <Disclosure.Panel as="nav">
                                <ul
                                    className={classNames(
                                        'absolute z-50 flex w-full flex-col items-center justify-center shadow-md xl:hidden',
                                        mobileDropdownClasses
                                    )}
                                >
                                    <div className="mt-3">
                                        <LanguageSelect dashboard={dashboard} lang={lang} />
                                    </div>
                                    {menuItems.map((item) => {
                                        if (item.url) {
                                            return (
                                                <div key={item.id} className="w-full">
                                                    <Link href={item.url} target="_blank">
                                                        <li
                                                            className={classNames(
                                                                'cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white',
                                                                menuButtonItemClasses
                                                            )}
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
                                                        className={classNames(
                                                            'cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white',
                                                            menuButtonItemClasses
                                                        )}
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

            {/* Mobile filters panel */}
            <div
                className={classNames(
                    'fixed z-40 h-[calc(100vh-96px)] w-full overflow-y-auto bg-white px-8 pb-3 pt-6 xl:hidden',
                    showMobileFiltersPanel ? 'flex flex-col' : 'hidden'
                )}
            >
                <FiltersPanel dashboard={dashboard} lang={lang} />
            </div>
        </>
    )
}

const HamburgerMenu = ({ open }: IHamburgerMenuProps) => {
    return <FontAwesomeIcon className={open ? 'text-4xl' : 'text-3xl'} icon={open ? faXmark : faBars} />
}
