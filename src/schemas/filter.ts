import { z } from 'zod'

export const filterSchema = z.object({
    countries: z.array(z.string()),
    regions: z.array(z.string()),
    provinces: z.array(z.string()),
    ages: z.array(z.string()),
    age_buckets: z.array(z.string()),
    genders: z.array(z.string()),
    professions: z.array(z.string()),
    response_topics: z.array(z.string()),
    only_responses_from_categories: z.boolean(),
    only_multi_word_phrases_containing_filter_term: z.boolean(),
    keyword_filter: z.string(),
    keyword_exclude: z.string(),
})

export type TFilter = z.infer<typeof filterSchema>

// Use function
export const defaultFilterValues: TFilter = {
    countries: [],
    regions: [],
    provinces: [],
    ages: [],
    age_buckets: [],
    genders: [],
    professions: [],
    response_topics: [],
    only_responses_from_categories: false,
    only_multi_word_phrases_containing_filter_term: false,
    keyword_filter: '',
    keyword_exclude: '',
}
