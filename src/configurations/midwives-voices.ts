import { IConfiguration } from '@interfaces'
import { healthLiteracyLink, seoMainTitle, whatWomenWantLink } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Midwives Want'

export const configuration: IConfiguration = {
    id: DashboardName.MIDWIVES_VOICES,
    title: title,
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription:
        'What Women Want: What Midwives Want, led by White Ribbon Alliance (WRA) in collaboration with the International Confederation of Midwives (ICM), is a key companion to the What Women Want (WWW) campaign, which asked 1.2 million women and girls their top demand for quality reproductive and maternal healthcare.',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    dashboardLinksFooter: [whatWomenWantLink, healthLiteracyLink],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
}
