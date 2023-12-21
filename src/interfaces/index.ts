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

// App
export { type ILanguage } from './language'
export type { ICountry } from './country'
export type { IParams } from './params'

// WRA Dashboard API
export type { IFilterOptions } from './dashboard-api/filter-options'
export type { ICountryRegionOption } from './dashboard-api/filter-options'
export type { ICountryRegionProvinceOption } from './dashboard-api/filter-options'
export type { ICampaignRequest } from './dashboard-api/campaign-request'
export type {
    ICampaign,
    IWorldBubbleMapsCoordinate,
    IResponsesBreakdown,
    IResponsesSample,
    ITopWordsAndPhrases,
    ILivingSettingBreakdown,
} from './dashboard-api/campaign'
export type { IWordcloudWord } from './dashboard-api/wordcloud-word'
export type { ITopWord } from './dashboard-api/top-words'
export type { IHistogramData } from './dashboard-api/histogram-data'
export type { IResponsesBreakdownData } from './dashboard-api/campaign'
export type { IGenderBreakdown } from './dashboard-api/campaign'
export type { ISettings } from './dashboard-api/settings'
export type { ICampaignConfiguration } from './dashboard-api/campaign-configuration'
export type { IDataLoading } from './dashboard-api/data-loading'
