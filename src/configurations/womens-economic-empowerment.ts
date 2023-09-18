import { IConfiguration } from '@interfaces'
import { healthwellbeingLink, seoMainTitle, whatwomenwantLink } from '@constants'
import { DashboardName } from '@enums'

const title = "Women's Economic Empowerment"

export const configuration: IConfiguration = {
    id: DashboardName.WOMENS_ECONOMIC_EMPOWERMENT,
    campaignCode: 'wee',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: '',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    dashboardLinksFooter: [whatwomenwantLink, healthwellbeingLink],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1'],
}
