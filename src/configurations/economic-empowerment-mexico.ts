/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

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

import { IConfiguration } from '@interfaces'
import { LegacyDashboardName } from '@enums'

const title = 'Economic Empowerment in Mexico'
const dashboardName = LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO

export const configuration: IConfiguration = {
    campaignCode: 'giz',
    dashboardName: dashboardName,
    title: title,
    seoTitle: `${title} | White Ribbon Alliance`,
    seoMetaDescription:
        'We asked 10603 women in Mexico the question, "¿Qué es lo que más deseas o necesitas para encontrar empleo o un mejor empleo? Por favor, comparte sólo la petición más importante para ti." (What do you most want or need to find a job or a better job? Please share only the request that is most important to you.)',
    respondentsNounSingular: 'woman',
    respondentsNounPlural: 'women',
    showVideoLink: 'https://www.youtube.com/watch?v=nBzide5J3Hk',
    link: {
        id: dashboardName,
        title: title,
        link: `/en/${dashboardName}`,
    },
}
