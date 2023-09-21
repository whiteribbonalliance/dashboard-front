import { IConfiguration } from '@interfaces'
import { seoMainTitle } from '@constants'
import { DashboardName } from '@enums'

const title = 'Economic Empowerment in Mexico'

export const configuration: IConfiguration = {
    id: DashboardName.ECONOMIC_EMPOWERMENT_MEXICO,
    campaignCode: 'giz',
    seoTitle: `${title} | ${seoMainTitle}`,
    seoMetaDescription:
        'We asked 10603 women in Mexico the question, "¿Qué es lo que más deseas o necesitas para encontrar empleo o un mejor empleo? Por favor, comparte sólo la petición más importante para ti." (What do you most want or need to find a job or a better job? Please share only the request that is most important to you.)',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    questionsAskedCodes: ['q1', 'q2'],
    link: {
        id: DashboardName.ECONOMIC_EMPOWERMENT_MEXICO,
        title: 'Economic Empowerment in Mexico',
        link: 'https://explore.whiteribbonalliance.org/giz',
    },
}
