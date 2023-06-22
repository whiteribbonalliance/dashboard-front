'use client'

import Link from 'next/link'
import { DashboardName } from '@enums'
import React from 'react'
import {
    midwivesVoicesConfig,
    whatWomenWantConfig,
    whatYoungPeopleWantConfig,
    wwwPakistanConfig,
} from '@configurations'
import { IDashboardLink } from '@interfaces'
import { classNames } from '@utils'
import { useTranslation } from '@app/i18n/client'

interface IFooterProps {
    dashboard: string
    lang: string
}

export const Footer = ({ dashboard, lang }: IFooterProps) => {
    const { t } = useTranslation(lang)

    // Set footer link classes
    let footerLinkClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            footerLinkClasses = 'text-pmnchColors-secondary'
            break
        default:
            footerLinkClasses = 'text-defaultColors-secondary'
    }

    // Set footer note
    let footerNote: React.JSX.Element | undefined
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            footerNote = (
                <p>
                    {t('responses-from-original')}{' '}
                    <Link
                        href={'https://www.whiteribbonallianceindia.org/whats-latest/hamara-swasthya-hamari-awaz'}
                        className={classNames('underline', footerLinkClasses)}
                    >
                        Hamara Swasthya Hamari Awaz
                    </Link>{' '}
                    {t('campaign-not-included-results')}.
                </p>
            )
            break
        default:
            footerNote = undefined
            break
    }

    // Set other dashboard links
    let otherDashboardLinks: IDashboardLink[]
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            otherDashboardLinks = whatWomenWantConfig.dashboardLinksFooter
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            otherDashboardLinks = whatYoungPeopleWantConfig.dashboardLinksFooter
            break
        case DashboardName.MIDWIVES_VOICES:
            otherDashboardLinks = midwivesVoicesConfig.dashboardLinksFooter
            break
        case DashboardName.WWW_PAKISTAN:
            otherDashboardLinks = wwwPakistanConfig.dashboardLinksFooter
            break
        default:
            otherDashboardLinks = []
    }

    let informedConsentTranslation: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            informedConsentTranslation = t('www-respondents-informed-consent')
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            informedConsentTranslation = t('pmnch-respondents-informed-consent')
            break
        case DashboardName.MIDWIVES_VOICES:
            informedConsentTranslation = t('midwives-voices-respondents-informed-consent')
            break
        default:
            informedConsentTranslation = ''
    }

    return (
        <footer className="mx-7 my-7 flex flex-col gap-y-5 text-lg">
            {/* Footer note */}
            {footerNote && (
                <div>
                    <p>* {informedConsentTranslation}</p>
                    {footerNote}
                    <p>{t('to-protect-anonymity')}</p>
                </div>
            )}

            {/* Other dashboards */}
            {otherDashboardLinks.length > 0 && (
                <div>
                    <p>
                        {t('other-dashboards')}:{' '}
                        {otherDashboardLinks.map((otherDashboardLink, index) => {
                            return (
                                <span key={otherDashboardLink.id}>
                                    <Link
                                        key={otherDashboardLink.id}
                                        href={otherDashboardLink.link}
                                        className={classNames('underline', footerLinkClasses)}
                                    >
                                        {otherDashboardLink.title}
                                    </Link>
                                    {index + 1 < otherDashboardLinks.length && <> • </>}
                                </span>
                            )
                        })}
                    </p>
                </div>
            )}

            {/* Dashboard by */}
            <div>
                <p>
                    {t('dashboard-by')}{' '}
                    <Link
                        href={'https://freelancedatascientist.net/'}
                        className={classNames('underline', footerLinkClasses)}
                    >
                        Thomas Wood
                    </Link>{' '}
                    {t('at')}{' '}
                    <Link href={'https://fastdatascience.com/'} className={classNames('underline', footerLinkClasses)}>
                        Fast Data Science
                    </Link>
                </p>
            </div>
        </footer>
    )
}
