/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

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

import { LegacyDashboardName } from '@enums'
import { v4 as uuidv4 } from 'uuid'
import { getDefaultFilterValues, TFilter } from '@schemas/filter'
import _ from 'lodash'
import { ICampaignRequest } from '@interfaces'
import { languagesAzure, languagesGoogle } from '@constants'

/**
 * Merge Tailwind CSS classes
 *
 * @param classes Tailwind CSS classes
 */
export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

/***
 * Returns a "nice" number approximately equal to range
 * Rounds the number if round = true Takes the ceiling if round = false
 *
 * @param range The range
 * @param round Round or not
 */
export function niceNum(range: number, round: boolean) {
    if (range === 0) {
        range = 1
    }

    const exponent = Math.floor(Math.log10(range))
    const fraction = range / Math.pow(10, exponent)

    let niceFraction: number
    if (round) {
        if (fraction < 1.5) {
            niceFraction = 1
        } else if (fraction < 3) {
            niceFraction = 2
        } else if (fraction < 7) {
            niceFraction = 5
        } else {
            niceFraction = 10
        }
    } else {
        if (fraction <= 1) {
            niceFraction = 1
        } else if (fraction <= 2) {
            niceFraction = 2
        } else if (fraction <= 5) {
            niceFraction = 5
        } else {
            niceFraction = 10
        }
    }

    return Math.round(niceFraction * Math.pow(10, exponent))
}

/**
 * Format number to thousands separator
 *
 * @param num
 * @param lang
 */
export function toThousandsSep(num: number, lang: string) {
    let formattedNumber: string
    try {
        formattedNumber = num.toLocaleString(lang)
    } catch (error) {
        formattedNumber = num.toLocaleString('en')
    }

    return formattedNumber
}

/**
 * Get CSV file name from headers.
 * If the filename is not present in headers, a random filename will be generated.
 *
 * @param headers Headers
 */
export function getCsvFileNameFromHeaders(headers: Headers) {
    const contentDisposition = headers.get('content-disposition')
    let filename = ''
    if (contentDisposition) {
        filename = contentDisposition.split('filename=')[1]
    }
    if (filename === '') {
        filename = `${uuidv4().replace('-', '')}.csv`
    }

    return filename
}

/**
 * Download CSV blob
 *
 * @param blob The Blob
 * @param filename The filename
 */
export function downloadCsvBlob(blob: Blob, filename: string) {
    const file = new File([blob], filename, { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(file)
    window.open(url, '_blank')
    URL.revokeObjectURL(url)
}

/**
 * Get campaign request
 *
 * @param dashboard The dashboard
 * @param filters The filters
 */
export function getCampaignRequest(
    dashboard: string,
    filters: {
        filter1?: TFilter
        filter2?: TFilter
    }
) {
    const filtersClone = _.cloneDeep(filters)

    // Only filter by province if there is no district selected at wwwpakistan
    if (dashboard === LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN) {
        if (filtersClone.filter1 && filtersClone.filter1.regions.length > 0) {
            filtersClone.filter1.provinces = []
        }
        if (filtersClone.filter2 && filtersClone.filter2.regions.length > 0) {
            filtersClone.filter2.provinces = []
        }
    }

    // If the filter has not changed from the default filter values then do not send it with the request
    const defaultFilterValues = getDefaultFilterValues(dashboard)
    const filter1 = _.isEqual(filtersClone.filter1, defaultFilterValues) ? undefined : filtersClone.filter1
    const filter2 = _.isEqual(filtersClone.filter2, defaultFilterValues) ? undefined : filtersClone.filter2

    const campaignRequest: ICampaignRequest = { filter_1: filter1, filter_2: filter2 }

    return campaignRequest
}

/**
 * Get languages by dashboard
 *
 * @param dashboard The dashboard
 */
export function getLanguagesByDashboard(dashboard: string) {
    if (dashboard === LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT) {
        return languagesAzure
    } else {
        return languagesGoogle
    }
}
