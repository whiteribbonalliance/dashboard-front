/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

'use client'

import Link from 'next/link'
import { LegacyDashboardName } from '@enums'
import React, { useContext, useState } from 'react'
import { classNames, getCampaignRequest } from '@utils'
import { useTranslation } from '@app/i18n/client'
import { OrganizationLogos } from 'components/OrganizationLogos'
import { ParamsContext } from '@contexts/params'
import { downloadCampaignPublicData } from 'services/dashboard-api'
import { ConfigurationsContext } from '@contexts/configurations'
import { SettingsContext } from '@contexts/settings'

export const Footer = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang, filters, responseYear, config } = params
    const { allCampaignsConfigurations } = useContext(ConfigurationsContext)
    const [exportingDataset, setExportingDataset] = useState<boolean>(false)
    const { t } = useTranslation(lang)
    const { settings } = useContext(SettingsContext)

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
        case LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE:
            footerLinkClasses = 'text-dataExchangeColors-secondary'
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
                    {t('responses-from-original')}{' '}
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
        if (
            dashboard !== LegacyDashboardName.HEALTHWELLBEING &&
            dashboard !== LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE
        ) {
            return
        }

        if (!exportingDataset) {
            setExportingDataset(true)
            const campaignRequest = getCampaignRequest(dashboard, filters)

            try {
                await downloadCampaignPublicData(config.campaign_code, campaignRequest, responseYear)
                setExportingDataset(false)
            } catch (error) {
                setExportingDataset(false)
            }
        }
    }

    // Dashboard links
    const OtherDashboardLinks = () => {
        type TDashboardLinksData = {
            path: string
            title: string
            url: string
        }

        let dashboardLinksData: TDashboardLinksData[]
        if (dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT) {
            // The dashboard at whatyoungpeoplewant is deployed separately from the other five dashboards
            // So the links to the other dashboards should be added manually here
            dashboardLinksData = [
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/whatwomenwant',
                    title: 'What Women Want',
                },
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/midwivesvoices',
                    title: 'What Midwives Want',
                },
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/wwwpakistan',
                    title: 'What Women Want Pakistan',
                },
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/healthwellbeing',
                    title: "Women's Health and Well Being",
                },
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/giz',
                    title: 'Economic Empowerment in Mexico',
                },
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/allcampaigns',
                    title: 'Dashboard of Dashboards',
                },
                {
                    path: '',
                    url: 'https://explore.whiteribbonalliance.org/en/dataexchange',
                    title: 'World We Want Data Exchange',
                },
            ]
        } else {
            dashboardLinksData = otherDashboardsConfigurations.map((c) => {
                return { path: c.dashboard_path, url: c.dashboard_url, title: c.campaign_title }
            })
        }

        return dashboardLinksData.length > 0 ? (
            <div>
                <p>
                    {t('other-dashboards')}:{' '}
                    {dashboardLinksData.map((d, index) => {
                        let link
                        if (d.url) link = d.url
                        else link = `/en/${d.path}`
                        return (
                            <span key={d.path}>
                                <Link
                                    href={link}
                                    target="_blank"
                                    className={classNames('underline', footerLinkClasses)}
                                >
                                    {d.title}
                                </Link>
                                {index + 1 < dashboardLinksData.length && <> • </>}
                            </span>
                        )
                    })}
                </p>
            </div>
        ) : (
            <div></div>
        )
    }

    // Set display footer logos
    const displayFooterLogos = dashboard === LegacyDashboardName.HEALTHWELLBEING

    // Set display learn more about categories for healthwellbeing
    const displayLearnMoreAboutCategoriesForHealthWellbeing = dashboard === LegacyDashboardName.HEALTHWELLBEING

    // Set display learn more about categories for dataexchange
    const displayLearnMoreAboutCategoriesForDataexchange = dashboard === LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE

    // Set display results analyzed
    const displayResultsAnalyzed =
        dashboard === LegacyDashboardName.HEALTHWELLBEING ||
        dashboard === LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE

    // Set display AI constantly improved
    const displayAiConstantlyImproved =
        dashboard === LegacyDashboardName.HEALTHWELLBEING ||
        dashboard === LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE

    // Set display export dataset
    const displayExportDataset =
        dashboard === LegacyDashboardName.HEALTHWELLBEING ||
        dashboard === LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE

    // Set display explore initiatives
    const displayExploreInitiatives = dashboard === LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE

    // Set display data displayed survey
    const displayDataDisplayedSurvey = dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT

    // Set display informed consent
    const displayInformedConsent = dashboard !== LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT

    // Set display protect anonymity
    const displayProtectAnonymity = dashboard !== LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT

    // Set display data exchange contact
    const displayDataExchangeContact = dashboard === LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE

    return (
        <footer className="mx-7 my-7 mt-auto flex flex-col gap-y-5 text-lg">
            {/* Logo */}
            {displayFooterLogos && (
                <div className="mx-3 flex items-center justify-center xl:mx-0">
                    <OrganizationLogos dashboard={dashboard} />
                </div>
            )}

            {/* Learn more about categories for healthwellbeing */}
            {displayLearnMoreAboutCategoriesForHealthWellbeing && (
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

            {/* Learn more about categories for dataexchange */}
            {displayLearnMoreAboutCategoriesForDataexchange && (
                <div className="max-w-7xl">
                    <p>
                        <span>{removeLastCharIfDot(t('dataexchange-learn-more-about-categories'))}</span>
                        &nbsp;
                        <span className="font-bold">
                            <Link href="https://worldwewantproject.com" target="_blank">
                                {t('here-capitalized')}
                            </Link>
                            <span>.</span>
                        </span>
                    </p>
                </div>
            )}

            {/* Results analyzed */}
            {displayResultsAnalyzed && (
                <div className="max-w-5xl">
                    <p>{t('healthwellbeing-results-analyzed')}</p>
                </div>
            )}

            {/* Our AI is constantly being improved */}
            {displayAiConstantlyImproved && (
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
                {displayDataDisplayedSurvey && (
                    <div className="max-w-5xl">
                        <p>{t('pmn01a-data-displayed-survey')}</p>
                    </div>
                )}

                {/* Informed consent */}
                {displayInformedConsent && (
                    <div>
                        <p>* {informedConsentText}</p>
                    </div>
                )}

                {/* Footer note */}
                {footerNote && <div>{footerNote}</div>}

                {/* Protect anonymity */}
                {displayProtectAnonymity && (
                    <div>
                        <p>{t('to-protect-anonymity')}</p>
                    </div>
                )}
            </div>

            {/* Export dataset */}
            {displayExportDataset && (
                <div>
                    <p className="cursor-pointer font-bold" onClick={onExportDatasetClick}>
                        {exportDatasetText}
                    </p>
                    {exportingDataset && <p>{t('download-start-shortly')}</p>}
                </div>
            )}

            {/* Explore initiatives */}
            {displayExploreInitiatives && (
                <div>
                    <p>
                        <span>{t('dataexchange-explore-initiatives')}</span>
                        &nbsp;
                        <span className="font-bold">
                            <Link href="https://worldwewantproject.com" target="_blank">
                                {t('here-capitalized')}
                            </Link>
                            <span>.</span>
                        </span>
                    </p>
                </div>
            )}

            {/* Other dashboards */}
            <OtherDashboardLinks />

            {/* Data exchange contact */}
            {displayDataExchangeContact && (
                <div>
                    <p>
                        <span>{t('dataexchange-contact')}</span>
                        &nbsp;
                        <span className="font-bold">
                            <Link href="https://worldwewantproject.com" target="_blank">
                                {t('here-capitalized')}
                            </Link>
                            <span>.</span>
                        </span>
                    </p>
                </div>
            )}

            {/* Dashboard by */}
            <div>
                <p>
                    {settings.owner_name && (
                        <span>
                            {t('dashboard-by')}{' '}
                            {settings.owner_url ? (
                                <Link
                                    href={settings.owner_url}
                                    target="_blank"
                                    className={classNames('underline', footerLinkClasses)}
                                >
                                    {settings.owner_name}
                                </Link>
                            ) : (
                                <span>{settings.owner_name}</span>
                            )}
                        </span>
                    )}
                    {settings.owner_name && settings.company_name && <span> {t('at')} </span>}
                    {settings.company_name && (
                        <span>
                            {settings.company_url ? (
                                <Link
                                    href={settings.company_url}
                                    target="_blank"
                                    className={classNames('underline', footerLinkClasses)}
                                >
                                    {settings.company_name}
                                </Link>
                            ) : (
                                <span>{settings.company_name}</span>
                            )}
                        </span>
                    )}
                    .
                </p>
            </div>
        </footer>
    )
}
