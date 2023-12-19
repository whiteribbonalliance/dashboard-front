'use client'

import Link from 'next/link'
import { LegacyDashboardName } from '@enums'
import React, { useContext, useState } from 'react'
import { applyToThousandsSepOnText, classNames, getCampaignRequest } from '@utils'
import { useTranslation } from '@app/i18n/client'
import { OrganizationLogos } from 'components/OrganizationLogos'
import { ParamsContext } from '@contexts/params'
import { downloadCampaignPublicData } from 'services/dashboard-api'
import { ConfigurationContext } from '@contexts/configuration'

export const Footer = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang, filters, responseYear } = params
    const { currentCampaignConfiguration, allCampaignsConfigurations } = useContext(ConfigurationContext)
    const [exportingDataset, setExportingDataset] = useState<boolean>(false)
    const { t } = useTranslation(lang)

    // Set export dataset text
    let exportDatasetText = t('export-dataset')
    if (exportDatasetText.charAt(exportDatasetText.length - 1) === '.') {
        exportDatasetText = exportDatasetText.slice(0, -1)
    }

    // Other dashboard configurations
    const otherDashboardsConfigurations = allCampaignsConfigurations.filter(
        (configuration) => configuration.dashboard_path !== dashboard
    )

    // Set footer link classes
    let footerLinkClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            footerLinkClasses = 'text-pmnchColors-secondary'
            break
        default:
            footerLinkClasses = 'text-defaultColors-secondary'
    }

    // Set informed consent text
    let informedConsentText: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_WOMEN_WANT:
            informedConsentText = t('women-informed-consent')
            break
        default:
            informedConsentText = t('respondents-informed-consent')
    }

    // Set footer note
    let footerNote: React.JSX.Element | undefined
    switch (dashboard) {
        case LegacyDashboardName.WHAT_WOMEN_WANT:
            footerNote = (
                <p>
                    {applyToThousandsSepOnText(t('responses-from-original'), lang)}{' '}
                    <Link
                        href={
                            'http://www.c3india.org/uploads/news/Findings_from_National_campaign_Hamara_Swasthya_Hamari_Awaz_(English).pdf'
                        }
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

    // On export dataset click
    async function onExportDatasetClick() {
        if (!exportingDataset) {
            setExportingDataset(true)
            const campaignRequest = getCampaignRequest(dashboard, filters)

            try {
                await downloadCampaignPublicData(currentCampaignConfiguration.campaign_code, campaignRequest, responseYear)
                setExportingDataset(false)
            } catch (error) {
                setExportingDataset(false)
            }
        }
    }

    return (
        <footer className="mx-7 my-7 flex flex-col gap-y-5 text-lg">
            {/* Logo */}
            {dashboard === LegacyDashboardName.HEALTHWELLBEING && (
                <div className="mx-3 flex items-center justify-center xl:mx-0">
                    <OrganizationLogos dashboard={dashboard} />
                </div>
            )}

            {/* Learn more about categories */}
            {dashboard === LegacyDashboardName.HEALTHWELLBEING && (
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
            {dashboard === LegacyDashboardName.HEALTHWELLBEING && (
                <div className="max-w-5xl">
                    <p>{t('healthwellbeing-results-analyzed')}</p>
                </div>
            )}

            {/* Our AI is constantly being improved */}
            {dashboard === LegacyDashboardName.HEALTHWELLBEING && (
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
                {dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                    <div className="max-w-5xl">
                        <p>{t('pmn01a-data-displayed-survey')}</p>
                    </div>
                )}

                {/* Informed consent */}
                {dashboard !== LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                    <div>
                        <p>* {informedConsentText}</p>
                    </div>
                )}

                {/* Footer note */}
                {footerNote && <div>{footerNote}</div>}

                {/* Protect anonymity */}
                {dashboard !== LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                    <div>
                        <p>{t('to-protect-anonymity')}</p>
                    </div>
                )}
            </div>

            {/* Export dataset */}
            {dashboard === LegacyDashboardName.HEALTHWELLBEING && (
                <div>
                    <span className="cursor-pointer font-bold" onClick={onExportDatasetClick}>
                        {exportDatasetText}
                    </span>
                    {exportingDataset && <div>{t('download-start-shortly')}</div>}
                </div>
            )}

            {/* Other dashboards */}
            {otherDashboardsConfigurations.length > 0 && (
                <div>
                    <p>
                        {t('other-dashboards')}:{' '}
                        {otherDashboardsConfigurations.map((configuration, index) => {
                            return (
                                <span key={configuration.dashboard_path}>
                                    <Link
                                        href={`/${configuration.dashboard_path}`}
                                        target="_blank"
                                        className={classNames('underline', footerLinkClasses)}
                                    >
                                        {configuration.dashboard_name}
                                    </Link>
                                    {index + 1 < otherDashboardsConfigurations.length && <> • </>}
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
                        target="_blank"
                        className={classNames('underline', footerLinkClasses)}
                    >
                        Thomas Wood
                    </Link>{' '}
                    {t('at')}{' '}
                    <Link
                        href={'https://fastdatascience.com/'}
                        target="_blank"
                        className={classNames('underline', footerLinkClasses)}
                    >
                        Fast Data Science
                    </Link>
                </p>
            </div>
        </footer>
    )
}
