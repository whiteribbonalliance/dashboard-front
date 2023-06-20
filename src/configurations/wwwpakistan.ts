import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'What Women Want Pakistan'

export const configuration: IConfiguration = {
    id: DashboardName.WWW_PAKISTAN,
    title: title,
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription: 'We asked 245311 women in Pakistan, what they want to improve their health and wellbeing.',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    dashboardLinksFooter: [],
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
}
