import { z } from 'zod'
import { TDashboard } from '@types'
import { DashboardName } from '@enums'

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
export function getDefaultFilterValues(dashboard: TDashboard) {
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT_PAKISTAN:
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
        case DashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
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
