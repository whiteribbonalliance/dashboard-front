import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = "Women's Economic Empowerment"

export const configuration: IConfiguration = {
    id: DashboardName.WOMENS_ECONOMIC_EMPOWERMENT,
    campaignCode: 'wee',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: '',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1'],
    link: {
        id: DashboardName.WOMENS_ECONOMIC_EMPOWERMENT,
        title: "Women's Economic Empowerment",
        link: 'https://explore.whiteribbonalliance.org/womenseconomicempowerment',
    },
}
