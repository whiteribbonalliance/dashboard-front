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

// The values below will also be used to check the subdomain/path requesting a dashboard, do not change them
const WHAT_YOUNG_PEOPLE_WANT = 'whatyoungpeoplewant'
const WHAT_WOMEN_WANT = 'whatwomenwant'
const MIDWIVES_VOICES = 'midwivesvoices'
const HEALTHWELLBEING = 'healthwellbeing'
const ECONOMIC_EMPOWERMENT_MEXICO = 'giz'
const WHAT_WOMEN_WANT_PAKISTAN = 'wwwpakistan'
const ALL_CAMPAIGNS = 'allcampaigns'
const WORLD_WE_WANT_DATA_EXCHANGE = 'dataexchange'

export const legacyDashboardNames = [
    WHAT_YOUNG_PEOPLE_WANT,
    WHAT_WOMEN_WANT,
    MIDWIVES_VOICES,
    HEALTHWELLBEING,
    ECONOMIC_EMPOWERMENT_MEXICO,
    WHAT_WOMEN_WANT_PAKISTAN,
    ALL_CAMPAIGNS,
    WORLD_WE_WANT_DATA_EXCHANGE,
] as const

export const LegacyDashboardName = Object.freeze({
    WHAT_YOUNG_PEOPLE_WANT: WHAT_YOUNG_PEOPLE_WANT,
    WHAT_WOMEN_WANT: WHAT_WOMEN_WANT,
    MIDWIVES_VOICES: MIDWIVES_VOICES,
    HEALTHWELLBEING: HEALTHWELLBEING,
    ECONOMIC_EMPOWERMENT_MEXICO: ECONOMIC_EMPOWERMENT_MEXICO,
    WHAT_WOMEN_WANT_PAKISTAN: WHAT_WOMEN_WANT_PAKISTAN,
    ALL_CAMPAIGNS: ALL_CAMPAIGNS,
    WORLD_WE_WANT_DATA_EXCHANGE: WORLD_WE_WANT_DATA_EXCHANGE,
})
