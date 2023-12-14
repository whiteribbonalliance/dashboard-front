'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { OrganizationLogos } from 'components/OrganizationLogos'
import { Disclosure, Transition } from '@headlessui/react'
import Link from 'next/link'
import { LegacyDashboardName } from '@enums'
import React, { useContext, useState } from 'react'
import { Button } from '@components/Button/Button'
import { FiltersPanel } from '@components/FiltersPanel'
import { LanguageSelect } from '@components/LanguageSelect'
import { Chevron } from '@components/Chevron'
import { classNames, getDashboardConfig } from '@utils'
import { useTranslation } from '@app/i18n/client'
import Image from 'next/image'
import { Title } from '@components/Title'
import { ParamsContext } from '@contexts/params'
import { useQuery } from 'react-query'
import { ISettings } from '@interfaces'
import { getSettings } from '@services/dashboard-api'

interface IHamburgerMenuProps {
    open: boolean
}

export const Header = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const [showMobileFiltersPanel, setShowMobileFiltersPanel] = useState<boolean>(false)
    const config = getDashboardConfig(dashboard)
    const { t } = useTranslation(lang)

    // Settings query
    const settingsGeoQuery = useQuery<ISettings>({
        queryKey: ['settings'],
        queryFn: () => getSettings(),
        refetchOnWindowFocus: false,
    })

    const showVideoLink = config.showVideoLink

    // Create menu items
    let menuItems = [
        { id: 'about-us', title: t('about-us'), url: 'https://whiteribbonalliance.org/movements/womens-health' },
        { id: 'show-video', title: t('show-video'), url: showVideoLink },
    ]

    // For PMNCH, remove about us
    if (dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT) {
        menuItems = menuItems.filter((item) => item.id !== 'about-us')
    }

    // Set mobile dropdown classes
    let mobileDropdownClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            mobileDropdownClasses = 'bg-pmnchColors-primary'
            break
        default:
            mobileDropdownClasses = 'bg-defaultColors-primary'
    }

    // Set menu button item classes
    let menuButtonItemClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            menuButtonItemClasses = 'hover:text-pmnchColors-font'
            break
        default:
            menuButtonItemClasses = 'hover:text-defaultColors-font'
    }

    return (
        <>
            <Disclosure
                as="header"
                className="sticky top-0 z-50 h-24 bg-white shadow-md xl:static xl:h-28 xl:shadow-none"
            >
                {({ open }) => (
                    <>
                        <div className="flex h-full items-center justify-between px-7 py-7">
                            <div className="flex items-center">
                                {/* Button to display filters panel */}
                                <div
                                    className="xl:hidden"
                                    onClick={() => setShowMobileFiltersPanel((prev) => !prev)}
                                    title="Filters"
                                >
                                    <div className="flex text-3xl">
                                        <Chevron direction="left" double={true} rotate={showMobileFiltersPanel} />
                                    </div>
                                </div>

                                {/* Logo */}
                                {dashboard !== LegacyDashboardName.HEALTHWELLBEING && (
                                    <div className="mx-3 flex items-center xl:mx-0">
                                        <OrganizationLogos dashboard={dashboard} />
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div className="hidden xl:flex">
                                <Title noHeading />
                            </div>

                            {/* Menu items */}
                            <nav className="hidden gap-x-3 xl:flex xl:items-center">
                                {settingsGeoQuery.data?.translations_enabled && (
                                    <LanguageSelect dashboard={dashboard} lang={lang} />
                                )}

                                {menuItems.map((item) => {
                                    if (item.url) {
                                        return (
                                            <Link key={item.id} href={item.url} target="_blank">
                                                <Button dashboard={dashboard} text={item.title} size="text-xl" />
                                            </Link>
                                        )
                                    } else {
                                        return (
                                            <Button
                                                dashboard={dashboard}
                                                key={item.id}
                                                text={item.title}
                                                size="text-xl"
                                            />
                                        )
                                    }
                                })}
                                {dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT && <PmnchLogo />}
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
                                    {settingsGeoQuery.data?.translations_enabled && (
                                        <div className="mt-3">
                                            <LanguageSelect dashboard={dashboard} lang={lang} />
                                        </div>
                                    )}
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
                                    {dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT && <PmnchLogo />}
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
                <FiltersPanel />
            </div>
        </>
    )
}

const HamburgerMenu = ({ open }: IHamburgerMenuProps) => {
    return <FontAwesomeIcon className={open ? 'text-4xl' : 'text-3xl'} icon={open ? faXmark : faBars} />
}

const PmnchLogo = () => {
    return (
        <div className="flex w-full py-2 hover:bg-white xl:w-fit xl:py-0">
            <Link href={'https://pmnch.who.int'} target="_blank" className="flex w-full justify-center">
                <Image
                    className="max-h-[4.5rem] w-full max-w-[17rem] object-contain xl:max-h-[4rem]"
                    src="/logos/pmnch_logo_2.png"
                    alt="pmnch logo"
                    width={1117}
                    height={200}
                />
            </Link>
        </div>
    )
}
