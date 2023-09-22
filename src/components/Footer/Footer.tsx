import Link from 'next/link'
import { DashboardName } from '@enums'
import React from 'react'
import { applyToThousandsSepOnText, classNames } from '@utils'
import { useTranslation } from '@app/i18n'
import { TDashboard } from '@types'
import { dashboardsConfigs } from '@configurations'

interface IFooterProps {
    dashboard: TDashboard
    lang: string
}

export const Footer = async ({ dashboard, lang }: IFooterProps) => {
    const { t } = await useTranslation(lang)

    // Footer links
    const dashboardLinks = dashboardsConfigs.map((configuration) => configuration.link)
    const footerLinks = dashboardLinks.filter((dashboardLink) => dashboardLink.id !== dashboard)

    // Set footer link classes
    let footerLinkClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            footerLinkClasses = 'text-pmnchColors-secondary'
            break
        default:
            footerLinkClasses = 'text-defaultColors-secondary'
    }

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
                    {applyToThousandsSepOnText(t('responses-from-original'), lang)}{' '}
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
            <div>
                {/* Data displayed survey */}
                {dashboard === DashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                    <div className="max-w-5xl">
                        <p>{t('pmn01a-data-displayed-survey')}</p>
                    </div>
                )}

                {/* Informed consent */}
                {dashboard !== DashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                    <div>
                        <p>* {informedConsentText}</p>
                    </div>
                )}

                {/* Footer note */}
                {footerNote && <div>{footerNote}</div>}

                {/* Protect anonymity */}
                {dashboard !== DashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                    <div>
                        <p>{t('to-protect-anonymity')}</p>
                    </div>
                )}
            </div>

            {/* Other dashboards */}
            {footerLinks.length > 0 && (
                <div>
                    <p>
                        {t('other-dashboards')}:{' '}
                        {footerLinks.map((footerLink, index) => {
                            return (
                                <span key={footerLink.id}>
                                    <Link
                                        key={footerLink.id}
                                        href={footerLink.link}
                                        className={classNames('underline', footerLinkClasses)}
                                    >
                                        {footerLink.title}
                                    </Link>
                                    {index + 1 < footerLinks.length && <> • </>}
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
