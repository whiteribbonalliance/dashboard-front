import { IConfiguration } from '@interfaces'
import { healthLiteracyLink, midwivesVoicesLink, seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Women Want'

export const configuration: IConfiguration = {
    id: DashboardName.WHAT_WOMEN_WANT,
    title: title,
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription:
        'What Women Want: What Midwives Want, led by White Ribbon Alliance (WRA) in collaboration with the International Confederation of Midwives (ICM), is a key companion to the What Women Want (WWW) campaign, which asked 1.2 million women and girls their top demand for quality reproductive and maternal healthcare.',
    subtext:
        'Gain access to the 1.2 million open-ended responses through this interactive dashboard, a unique tool that connects women’s and girls’ voices with the almost infinite possibilities of digital analysis.',
    respondentsNoun: 'women',
    dashboardLinksFooter: [midwivesVoicesLink, healthLiteracyLink],
    questionAsked: 'What is your one request for quality reproductive and maternal healthcare services?',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    aboutUs: 'About Us'
}
