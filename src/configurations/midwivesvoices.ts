import { IConfiguration } from '@interfaces'
import { healthliteracyLink, seoMainTitle, whatwomenwantLink } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Midwives Want'

export const configuration: IConfiguration = {
    id: DashboardName.MIDWIVES_VOICES,
    campaignCode: 'midwife',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription:
        'What Women Want: What Midwives Want, led by White Ribbon Alliance (WRA) in collaboration with the International Confederation of Midwives (ICM), is a key companion to the What Women Want (WWW) campaign, which asked 1.2 million women and girls their top demand for quality reproductive and maternal healthcare.',
    respondentsNounSingular: 'respondent',
    respondentsNounPlural: 'respondents',
    dashboardLinksFooter: [whatwomenwantLink, healthliteracyLink],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAsked: [],
}
