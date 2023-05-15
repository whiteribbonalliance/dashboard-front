import Link from 'next/link'
import { Dashboards } from '@enums'
import React from 'react'

interface IFooterProps {
    dashboard: string
}

export const Footer = ({ dashboard }: IFooterProps) => {
    // Set footer link classes
    let footerLinkClasses: string
    switch (dashboard) {
        case Dashboards.WWW:
            footerLinkClasses = 'text-default-colors-secondary'
            break
        case Dashboards.PMNCH:
            footerLinkClasses = 'text-pmnch-colors-secondary'
            break
        case Dashboards.MIDWIVES_VOICES:
            footerLinkClasses = 'text-default-colors-secondary'
            break
        default:
            footerLinkClasses = 'text-default-colors-secondary'
    }

    // Set respondents
    let respondents: string
    switch (dashboard) {
        case Dashboards.WWW:
            respondents = 'women'
            break
        case Dashboards.PMNCH:
            respondents = 'respondents'
            break
        case Dashboards.MIDWIVES_VOICES:
            respondents = 'respondents'
            break
        default:
            respondents = 'respondents'
    }

    // Set footer note
    let footerNote: React.JSX.Element | undefined
    switch (dashboard) {
        case Dashboards.WWW:
            footerNote = (
                <p>
                    The 143556 responses from the original{' '}
                    <Link
                        href={'https://www.whiteribbonallianceindia.org/whats-latest/hamara-swasthya-hamari-awaz'}
                        className={`underline ${footerLinkClasses}`}
                    >
                        Hamara Swasthya Hamari Awaz
                    </Link>{' '}
                    campaign are not included in these results.
                </p>
            )
            break
        case Dashboards.PMNCH:
            footerNote = undefined
            break
        case Dashboards.MIDWIVES_VOICES:
            footerNote = undefined
            break
        default:
            footerNote = undefined
            break
    }

    // Set dashboard links
    type OtherDashboardLink = { id: string; title: string; link: string }
    let otherDashboardLinks: OtherDashboardLink[]
    const whatWomenWantLink: OtherDashboardLink = {
        id: 'whatwomenwant',
        title: 'What Women Want',
        link: 'https://whatwomenwant.whiteribbonalliance.org',
    }
    const healthLiteracyLink: OtherDashboardLink = {
        id: 'healthliteracy',
        title: 'Health Literacy',
        link: 'https://wwwliteracydashboard.whiteribbonalliance.org',
    }
    const whatMidwivesWantLink: OtherDashboardLink = {
        id: 'whatmidwiveswant',
        title: 'What Midwives Want',
        link: 'https://midwivesvoices.whiteribbonalliance.org',
    }
    switch (dashboard) {
        case Dashboards.WWW:
            otherDashboardLinks = [whatMidwivesWantLink, healthLiteracyLink]
            break
        case Dashboards.PMNCH:
            otherDashboardLinks = [whatWomenWantLink, healthLiteracyLink, whatMidwivesWantLink]
            break
        case Dashboards.MIDWIVES_VOICES:
            otherDashboardLinks = [whatWomenWantLink, healthLiteracyLink]
            break
        default:
            otherDashboardLinks = []
    }

    return (
        <footer className="mx-7 mt-3 flex flex-col gap-y-5">
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
                            <>
                                <Link
                                    key={otherDashboardLink.id}
                                    href={otherDashboardLink.link}
                                    className={`underline ${footerLinkClasses}`}
                                >
                                    {otherDashboardLink.title}
                                </Link>
                                {index + 1 < otherDashboardLinks.length && <> • </>}
                            </>
                        )
                    })}
                </p>
            </div>

            <div>
                <p>
                    Dashboard by{' '}
                    <Link href={'https://freelancedatascientist.net/'} className={`underline ${footerLinkClasses}`}>
                        Thomas Wood
                    </Link>{' '}
                    at{' '}
                    <Link href={'https://fastdatascience.com/'} className={`underline ${footerLinkClasses}`}>
                        Fast Data Science
                    </Link>
                </p>
            </div>
        </footer>
    )
}
