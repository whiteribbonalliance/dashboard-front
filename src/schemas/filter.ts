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

import { z } from 'zod'
import { LegacyDashboardName } from '@enums'

export const filterSchema = z.object({
    countries: z.array(z.string()),
    regions: z.array(z.string()),
    provinces: z.array(z.string()),
    ages: z.array(z.string()),
    age_buckets: z.array(z.string()),
    genders: z.array(z.string()),
    living_settings: z.array(z.string()),
    professions: z.array(z.string()),
    response_topics: z.array(z.string()),
    only_responses_from_categories: z.boolean(),
    only_multi_word_phrases_containing_filter_term: z.boolean(),
    keyword_filter: z.string(),
    keyword_exclude: z.string(),
})

export type TFilter = z.infer<typeof filterSchema>

// Default filter values
export function getDefaultFilterValues(dashboard: string) {
    switch (dashboard) {
        case LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            return {
                countries: ['PK'],
                regions: [],
                provinces: [],
                ages: [],
                age_buckets: [],
                genders: [],
                living_settings: [],
                professions: [],
                response_topics: [],
                only_responses_from_categories: false,
                only_multi_word_phrases_containing_filter_term: false,
                keyword_filter: '',
                keyword_exclude: '',
            } as TFilter
        case LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            return {
                countries: ['MX'],
                regions: [],
                provinces: [],
                ages: [],
                age_buckets: [],
                genders: [],
                living_settings: [],
                professions: [],
                response_topics: [],
                only_responses_from_categories: false,
                only_multi_word_phrases_containing_filter_term: false,
                keyword_filter: '',
                keyword_exclude: '',
            } as TFilter
        default:
            return {
                countries: [],
                regions: [],
                provinces: [],
                ages: [],
                age_buckets: [],
                genders: [],
                living_settings: [],
                professions: [],
                response_topics: [],
                only_responses_from_categories: false,
                only_multi_word_phrases_containing_filter_term: false,
                keyword_filter: '',
                keyword_exclude: '',
            } as TFilter
    }
}
