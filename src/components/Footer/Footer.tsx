import Link from 'next/link'
import { DashboardName } from '@enums'
import React from 'react'
import { classNames, getDashboardConfig } from '@utils'
import { useTranslation } from '@app/i18n'
import { Dashboard } from '@types'

interface IFooterProps {
    dashboard: Dashboard
    lang: string
}

export const Footer = async ({ dashboard, lang }: IFooterProps) => {
    const { t } = await useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    // Set footer link classes
    let footerLinkClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            footerLinkClasses = 'text-pmnchColors-secondary'
            break
        default:
            footerLinkClasses = 'text-defaultColors-secondary'
    }

    let otherDashboardLinks = config.dashboardLinksFooter

    // Set informed consent text
    let informedConsentText: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            informedConsentText = t('women-informed-consent')
            break
        default:
            informedConsentText = t('respondents-informed-consent')
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
    }

    return (
        <footer className="mx-7 my-7 flex flex-col gap-y-5 text-lg">
            {/* Footer note */}
            {footerNote && (
                <div>
                    <p>* {informedConsentText}</p>
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
