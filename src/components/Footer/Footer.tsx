import Link from 'next/link'
import { DashboardName } from '@enums'
import React from 'react'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'
import { IDashboardLink } from '@interfaces'
import { classNames } from '@utils'

interface IFooterProps {
    dashboard: string
}

export const Footer = async ({ dashboard }: IFooterProps) => {
    // Set footer link classes
    let footerLinkClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            footerLinkClasses = 'text-pmnchColors-secondary'
            break
        default:
            footerLinkClasses = 'text-defaultColors-secondary'
    }

    // Set respondents
    let respondents: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            respondents = whatWomenWantConfig.respondentsNounPlural
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            respondents = whatYoungPeopleWantConfig.respondentsNounPlural
            break
        case DashboardName.MIDWIVES_VOICES:
            respondents = midwivesVoicesConfig.respondentsNounPlural
            break
        default:
            respondents = 'respondents'
    }

    // Set footer note
    let footerNote: React.JSX.Element | undefined
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            footerNote = (
                <p>
                    The 143556 responses from the original{' '}
                    <Link
                        href={'https://www.whiteribbonallianceindia.org/whats-latest/hamara-swasthya-hamari-awaz'}
                        className={classNames('underline', footerLinkClasses)}
                    >
                        Hamara Swasthya Hamari Awaz
                    </Link>{' '}
                    campaign are not included in these results.
                </p>
            )
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            footerNote = undefined
            break
        case DashboardName.MIDWIVES_VOICES:
            footerNote = undefined
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
        default:
            otherDashboardLinks = []
    }

    return (
        <footer className="mx-7 my-7 flex flex-col gap-y-5 text-lg">
            <div>
                <p>* All {respondents} participating in the campaign provided informed consent.</p>
                {footerNote && footerNote}
                <p>To protect anonymity, some respondents have been removed from this dashboard.</p>
            </div>

            <div>
                <p>
                    Other dashboards:{' '}
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

            <div>
                <p>
                    Dashboard by{' '}
                    <Link
                        href={'https://freelancedatascientist.net/'}
                        className={classNames('underline', footerLinkClasses)}
                    >
                        Thomas Wood
                    </Link>{' '}
                    at{' '}
                    <Link href={'https://fastdatascience.com/'} className={classNames('underline', footerLinkClasses)}>
                        Fast Data Science
                    </Link>
                </p>
            </div>
        </footer>
    )
}
