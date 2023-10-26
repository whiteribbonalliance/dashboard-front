'use client'

import Link from 'next/link'
import { DashboardName } from '@enums'
import React, { useContext, useState } from 'react'
import { applyToThousandsSepOnText, classNames, getDashboardConfig } from '@utils'
import { useTranslation } from '@app/i18n/client'
import { dashboardsConfigs } from '@configurations'
import { OrganizationLogos } from 'components/OrganizationLogos'
import { ParamsContext } from '@contexts/params'

export const Footer = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const [exportDatasetLinkClicked, setExportDatasetLinkClicked] = useState<boolean>(false)
    const { t } = useTranslation(lang)
    const config = getDashboardConfig(dashboard)
    const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL

    // Set export dataset link
    let exportDatasetLink
    switch (dashboard) {
        case DashboardName.HEALTHWELLBEING:
            exportDatasetLink = `${apiUrl}/campaigns/${config.campaignCode}/public/data`
            break
        default:
            exportDatasetLink = ''
    }

    // Set export dataset text
    let exportDatasetText = t('export-dataset')
    if (exportDatasetText.charAt(exportDatasetText.length - 1) === '.') {
        exportDatasetText = exportDatasetText.slice(0, -1)
    }

    // Footer links
    // TODO: Temporarily hide womenseconomicempowerment
    const dashboardLinks = dashboardsConfigs.map((configuration) => configuration.link)
    const footerLinks = dashboardLinks
        .filter((dashboardLink) => dashboardLink.id !== dashboard)
        .filter((d) => d.id !== 'womenseconomicempowerment')

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

    // Remove last char from string if it is a dot
    function removeLastCharIfDot(text: string) {
        if (text.length > 0) {
            if (text.slice(-1) === '.') {
                return text.slice(0, -1)
            }
        }

        return text
    }

    return (
        <footer className="mx-7 my-7 flex flex-col gap-y-5 text-lg">
            {/* Logo */}
            {dashboard === DashboardName.HEALTHWELLBEING && (
                <div className="mx-3 flex items-center justify-center xl:mx-0">
                    <OrganizationLogos dashboard={dashboard} />
                </div>
            )}

            {/* Learn more about categories */}
            {dashboard === DashboardName.HEALTHWELLBEING && (
                <div className="max-w-7xl">
                    <p>
                        <span>{removeLastCharIfDot(t('healthwellbeing-learn-more-about-categories'))}</span>
                        &nbsp;
                        <span className="font-bold">
                            <Link
                                href="https://docs.google.com/spreadsheets/d/1pd5bjiZpU_j082LRMJ1OFDk3FVjT7HqzqV9eYtLi48w/edit?usp=sharing"
                                target="_blank"
                            >
                                {t('here-capitalized')}
                            </Link>
                            <span>.</span>
                        </span>
                    </p>
                </div>
            )}

            {/* Results analyzed */}
            {dashboard === DashboardName.HEALTHWELLBEING && (
                <div className="max-w-5xl">
                    <p>{t('healthwellbeing-results-analyzed')}</p>
                </div>
            )}

            {/* Our AI is constantly being improved */}
            {dashboard === DashboardName.HEALTHWELLBEING && (
                <div className="max-w-5xl">
                    <p>
                        <span>{removeLastCharIfDot(t('healthwellbeing-ai-constantly-improved'))}</span>
                        &nbsp;
                        <span className="font-bold">
                            <Link href="https://forms.gle/1zebtW3hBxGgZX2K6" target="_blank">
                                {t('here-capitalized')}
                            </Link>
                            <span>.</span>
                        </span>
                    </p>
                </div>
            )}

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

            {/* Export dataset */}
            {exportDatasetLink && (
                <div>
                    <Link
                        href={exportDatasetLink}
                        className="font-bold"
                        onClick={() => setExportDatasetLinkClicked(true)}
                    >
                        {exportDatasetText}
                    </Link>
                    {exportDatasetLinkClicked && <div>{t('download-start-shortly')}</div>}
                </div>
            )}

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
