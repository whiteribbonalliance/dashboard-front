'use client'

import { Disclosure, Tab, Transition } from '@headlessui/react'
import { classNames, getDashboardConfig } from '@utils'
import { DashboardName } from '@enums'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@components/Box'
import Image from 'next/image'
import { getCampaignFilterOptions, getCampaignsMergedFilterOptions } from '@services/wra-dashboard-api'
import { TDashboard, TOption } from '@types'
import { ICountryRegionOption, IFilterOptions } from '@interfaces'
import { Control, Controller, useForm, UseFormReturn } from 'react-hook-form'
import { SelectMultiValues } from '@components/SelectMultiValues'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { Chevron } from '@components/Chevron'
import { useFiltersStore } from '@stores/filters'
import { defaultFilterValues } from '@schemas/filter'
import { zodResolver } from '@hookform/resolvers/zod'
import { filterSchema, TFilter } from '@schemas/filter'
import { Stats } from '@components/FiltersPanel/Stats'
import { useTranslation } from '@app/i18n/client'
import { useFilterFormsStore } from '@stores/filter-forms'
import { useQuery } from 'react-query'
import { Tooltip } from '@components/Tooltip'
import { useRefetchCampaignStore } from '@stores/refetch-campaign'
import { Input } from '@components/Input'
import { QuestionAsked } from '@components/FiltersPanel/QuestionAsked'
import { useQuestionsAskedOptions } from '@hooks/use-questions-asked-options'
import { useQuestionAskedCodeStore } from '@stores/question-asked-code'
import { Loading } from 'components/Loading'

interface IFiltersPanelProps {
    dashboard: TDashboard
    lang: string
}

interface IFieldProps {
    id: string
    refetchCampaign: () => void
}

interface ISelectProps extends IFieldProps {
    dashboard: TDashboard
    options: (TOption<string> | TOption<boolean>)[]
    control: Control<TFilter>
}

interface IInputProps extends IFieldProps {
    control: Control<TFilter>
}

interface ITab {
    id: 'tab-1' | 'tab-2'
    title: string
    form: UseFormReturn<TFilter>
}

export const FiltersPanel = ({ dashboard, lang }: IFiltersPanelProps) => {
    const setFilters = useFiltersStore((state) => state.setFilters)
    const setForm1 = useFilterFormsStore((state) => state.setForm1)
    const setForm2 = useFilterFormsStore((state) => state.setForm2)
    const setRefetchCampaign = useRefetchCampaignStore((state) => state.setRefetchCampaign)
    const { t } = useTranslation(lang)
    const config = getDashboardConfig(dashboard)
    const questionsAskedOptions = useQuestionsAskedOptions(dashboard)
    const questionAskedCode = useQuestionAskedCodeStore((state) => state.questionAskedCode)
    const [tabs, setTabs] = useState<ITab[]>([])

    // Hide 'only responses from categories' filter option
    let hideResponseTopicRelatedFilters = false
    if (dashboard === DashboardName.HEALTHWELLBEING && questionAskedCode == 'q2') {
        hideResponseTopicRelatedFilters = true
    } else if (dashboard === DashboardName.WHAT_YOUNG_PEOPLE_WANT) {
        hideResponseTopicRelatedFilters = true
    }

    // Select options
    const [countryOptions, setCountryOptions] = useState<TOption<string>[]>([])
    const [responseTopicOptions, setResponseTopicOptions] = useState<TOption<string>[]>([])
    const [ageOptions, setAgeOptions] = useState<TOption<string>[]>([])
    const [ageRangeOptions, setAgeRangeOptions] = useState<TOption<string>[]>([])
    const [genderOptions, setGenderOptions] = useState<TOption<string>[]>([])
    const [professionOptions, setProfessionOptions] = useState<TOption<string>[]>([])
    const [onlyResponsesFromCategoriesOptions, setOnlyResponsesFromCategoriesOptions] = useState<TOption<boolean>[]>([])
    const [onlyMultiWordPhrasesContainingFilterTermOptions, setOnlyMultiWordPhrasesContainingFilterTermOptions] =
        useState<TOption<boolean>[]>([])

    // Select regions options(s) for each filter
    const [regionOptionsFilter1, setRegionOptionsFilter1] = useState<TOption<string>[]>([])
    const [regionOptionsFilter2, setRegionOptionsFilter2] = useState<TOption<string>[]>([])

    // Region options for each country
    const [countriesRegionsOptions, setCountriesRegionsOptions] = useState<ICountryRegionOption[]>([])

    // Refetch campaign timeout
    const refetchCampaignTimeout = useRef<NodeJS.Timeout>()

    // Set default filter values for form
    let defaultFilterValuesForForm: TFilter
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            defaultFilterValuesForForm = { ...defaultFilterValues }
            defaultFilterValuesForForm.countries = ['PK']
            break
        case DashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            defaultFilterValuesForForm = { ...defaultFilterValues }
            defaultFilterValuesForForm.countries = ['MX']
            break
        default:
            defaultFilterValuesForForm = defaultFilterValues
    }

    // Set display countries filter tooltip
    let displayCountriesFilterTooltip = true
    if (
        dashboard === DashboardName.WHAT_WOMEN_WANT_PAKISTAN ||
        dashboard === DashboardName.ECONOMIC_EMPOWERMENT_MEXICO
    ) {
        displayCountriesFilterTooltip = false
    }

    // Form 1
    const form1 = useForm<TFilter>({
        defaultValues: defaultFilterValuesForForm,
        resolver: zodResolver(filterSchema),
    })
    useEffect(() => setForm1(form1), [setForm1, form1])

    // Form 2
    const form2 = useForm<TFilter>({
        defaultValues: defaultFilterValuesForForm,
        resolver: zodResolver(filterSchema),
    })
    useEffect(() => setForm2(form2), [setForm2, form2])

    // Tabs
    useEffect(() => {
        const tmpTabs: ITab[] = [
            { id: 'tab-1', title: t('drill-down'), form: form1 },
            { id: 'tab-2', title: `${t('compare-to')}...`, form: form2 },
        ]
        setTabs(tmpTabs)
    }, [t, form1, form2])

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnchColors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-defaultColors-tertiary'
    }

    // Whether the PMNCH QR code should be displayed
    const displayPmnchQrCode = dashboard === DashboardName.WHAT_YOUNG_PEOPLE_WANT

    // Fetch filter options
    useQuery<IFilterOptions>({
        queryKey: [`campaign-filter-options-${dashboard}`],
        queryFn: () => {
            if (dashboard === DashboardName.ALL_CAMPAIGNS) {
                return getCampaignsMergedFilterOptions(lang)
            } else {
                return getCampaignFilterOptions(config, lang)
            }
        },
        refetchOnWindowFocus: false,
        retry: 3,
        onSuccess: (filterOptions) => {
            // Country options
            setCountryOptions(filterOptions.countries)

            // Country Regions options
            setCountriesRegionsOptions(filterOptions.country_regions)

            // Response topic options
            setResponseTopicOptions(
                filterOptions.response_topics.map((responseTopic) => {
                    return {
                        value: responseTopic.value,
                        label: responseTopic.label,
                        metadata: responseTopic.metadata,
                    } as TOption<string>
                })
            )

            // Age options
            setAgeOptions(filterOptions.ages)

            // Age range options
            setAgeRangeOptions(filterOptions.age_ranges)

            // Gender options
            setGenderOptions(filterOptions.genders)

            // Profession options
            setProfessionOptions(filterOptions.professions)

            // Only responses from categories options
            setOnlyResponsesFromCategoriesOptions(filterOptions.only_responses_from_categories)

            // Only multi-word phrases containing filter term options
            setOnlyMultiWordPhrasesContainingFilterTermOptions(
                filterOptions.only_multi_word_phrases_containing_filter_term
            )
        },
        onError: () => {},
    })

    // Set region options for filter
    const setRegionOptionsForFilter = useCallback(
        (
            selectedCountries: string[],
            setRegionOptionsFilter: Dispatch<SetStateAction<TOption<string>[]>>,
            form: UseFormReturn<TFilter>
        ) => {
            // Only display regions for 1 selected country
            if (selectedCountries.length !== 1) {
                setRegionOptionsFilter([])
                form.setValue('regions', [])
                return
            }

            // Set region options for selected country
            const countryRegionOptions = countriesRegionsOptions.find((countryRegionOption) => {
                return countryRegionOption.country_alpha2_code === selectedCountries[0]
            })
            if (countryRegionOptions) {
                setRegionOptionsFilter(countryRegionOptions.options)
            }
        },
        [countriesRegionsOptions]
    )

    // Set regions for the selected country for filter 1
    const watchCountriesForm1 = form1.watch('countries')
    useEffect(() => {
        setRegionOptionsForFilter(watchCountriesForm1, setRegionOptionsFilter1, form1)
    }, [watchCountriesForm1, form1, setRegionOptionsForFilter])

    // Set regions for the selected country for filter 2
    const watchCountriesForm2 = form2.watch('countries')
    useEffect(() => {
        setRegionOptionsForFilter(watchCountriesForm2, setRegionOptionsFilter2, form2)
    }, [watchCountriesForm2, form2, setRegionOptionsForFilter])

    // Cleanup refetch campaign timeout
    useEffect(() => {
        return () => {
            if (refetchCampaignTimeout.current) {
                clearTimeout(refetchCampaignTimeout.current)
            }
        }
    }, [refetchCampaignTimeout])

    // Refetch campaign
    const refetchCampaign = useCallback(() => {
        if (!form1 || !form2 || !setFilters) return

        // Clear the current refetch campaign timeout
        if (refetchCampaignTimeout.current) {
            clearTimeout(refetchCampaignTimeout.current)
        }

        // Add a small delay before refetching campaign
        refetchCampaignTimeout.current = setTimeout(() => {
            // Lowercase keyword_exclude and keyword_filter
            if (form1.getValues().keyword_exclude) {
                form1.getValues().keyword_exclude = form1.getValues().keyword_exclude.toLowerCase()
            }
            if (form1.getValues().keyword_filter) {
                form1.getValues().keyword_filter = form1.getValues().keyword_filter.toLowerCase()
            }

            // Lowercase keyword_exclude and keyword_filter
            if (form2.getValues().keyword_exclude) {
                form2.getValues().keyword_exclude = form2.getValues().keyword_exclude.toLowerCase()
            }
            if (form2.getValues().keyword_filter) {
                form2.getValues().keyword_filter = form2.getValues().keyword_filter.toLowerCase()
            }

            // Update the filters store (when filters are updated, useCampaignQuery will refetch campaign data)
            setFilters({ filter1: form1.getValues(), filter2: form2.getValues() })
        }, 450)
    }, [form1, form2, setFilters])

    // Set refetch campaign
    useEffect(() => {
        if (refetchCampaign) {
            setRefetchCampaign(refetchCampaign)
        }
    }, [setRefetchCampaign, refetchCampaign])

    // Set select response topics text
    let selectResponseTopicsText: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectResponseTopicsText = t('select-response-domains')
            break
        default:
            selectResponseTopicsText = t('select-response-topics')
    }

    return (
        <div>
            {/* Tooltip: filters */}
            <Tooltip
                id="filters-panel-tab-list"
                dashboard={dashboard}
                title={'Filter Controls'}
                paragraphs={[
                    'Here you can filter campaign responses.',
                    '“Select countries” and “Select response topics” are dropdowns that allow you to select from the list of participating countries and from the list of topic areas and categories.',
                ]}
            />

            {/* Tooltip: countries filter */}
            {displayCountriesFilterTooltip && (
                <Tooltip
                    id="filters-panel-select-country"
                    dashboard={dashboard}
                    title={'Filter by country'}
                    paragraphs={[
                        'Here you can filter responses by a particular country, or group of countries, by clicking on the country name in the dropdown.',
                        'You can also select a country by clicking on its bubble in the map view at the far bottom right of the Dashboard.',
                    ]}
                />
            )}

            {/* Tooltip: response topics */}
            <Tooltip
                id="filters-panel-select-response-topics"
                dashboard={dashboard}
                title={'Filter by Response Topic'}
                paragraphs={[
                    'Here you can drill down into the different categories of requests respondents demanded through the campaign.',
                    'You can select one or more topics by clicking on the category name in the dropdown.',
                    'You can also select a topic by clicking on its rectangle in the topic bar graph below.',
                ]}
            />

            {/* Tooltip: age */}
            <Tooltip
                id="filters-panel-select-age"
                dashboard={dashboard}
                title={'Filter by age'}
                paragraphs={[
                    'Use dropdowns to include only the ages you are filtering for.',
                    'You can also filter an age range by selecting specific bars on the age bar graph to the right.',
                ]}
            />

            {/* Tooltip: keyword */}
            <Tooltip
                id="filters-panel-input-keyword"
                dashboard={dashboard}
                title={'Filter by keywords'}
                paragraphs={[
                    'The “Filter by keyword” and “Exclude keyword” options allow for an even closer look at the responses by giving you the power to search for a specific keyword of your choosing.',
                ]}
            />

            {/* Tooltip: only multi-word phrases */}
            <Tooltip
                id="filters-panel-select-only-multi-word-phrases"
                dashboard={dashboard}
                title={'Advanced feature'}
                paragraphs={[
                    'To also see all the short phrases containing your chosen keyword term, select “Show only multi-word phrases containing the filter term.”',
                ]}
            />

            {/* Switch between questions */}
            {questionsAskedOptions.length > 1 && (
                <div className="mb-5">
                    <QuestionAsked dashboard={dashboard} />
                </div>
            )}

            {/* Filters */}
            <div className="mb-5 w-full">
                <Box>
                    {tabs.length < 1 ? (
                        <Loading dashboard={dashboard} />
                    ) : (
                        <Tab.Group>
                            <Tab.List
                                data-tooltip-id="filters-panel-tab-list"
                                className="mb-2 flex flex-col sm:flex-row"
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.id}
                                        className={({ selected }) =>
                                            classNames(
                                                'bg-grayLighter w-full py-5 leading-5 shadow-sm ring-transparent ring-offset-2 focus:outline-none',
                                                selected ? `border-t-2 bg-white ${selectedTabClasses}` : ''
                                            )
                                        }
                                    >
                                        {tab.title}
                                    </Tab>
                                ))}
                            </Tab.List>

                            <Tab.Panels>
                                {tabs.map(({ id, form }) => (
                                    <Tab.Panel
                                        key={id}
                                        className="flex flex-col p-3 ring-transparent ring-offset-2 focus:outline-none"
                                        unmount={false}
                                    >
                                        {/* Normal mode */}
                                        <div className="mb-5 flex flex-col gap-y-3">
                                            {/* Select countries */}
                                            <div>
                                                <div
                                                    className="mb-1 w-fit"
                                                    data-tooltip-id="filters-panel-select-country"
                                                >
                                                    {t('select-countries')}
                                                </div>
                                                <SelectCountries
                                                    id={`select-countries-${id}`}
                                                    dashboard={dashboard}
                                                    options={countryOptions}
                                                    control={form.control}
                                                    refetchCampaign={refetchCampaign}
                                                />
                                            </div>

                                            {/* Select regions */}
                                            <div>
                                                <div className="mb-1">{t('select-regions')}</div>
                                                <SelectRegions
                                                    id={`select-regions-${id}`}
                                                    dashboard={dashboard}
                                                    options={
                                                        id === 'tab-1' ? regionOptionsFilter1 : regionOptionsFilter2
                                                    }
                                                    control={form.control}
                                                    refetchCampaign={refetchCampaign}
                                                />
                                            </div>

                                            {/* Select response topics */}
                                            {/* Do not display if 'healthwellbeing' and 'q2' */}
                                            {!hideResponseTopicRelatedFilters && (
                                                <div>
                                                    <div
                                                        className="mb-1 w-fit"
                                                        data-tooltip-id="filters-panel-select-response-topics"
                                                    >
                                                        {selectResponseTopicsText}
                                                    </div>
                                                    <SelectResponseTopics
                                                        id={`select-response-topics-${id}`}
                                                        dashboard={dashboard}
                                                        options={responseTopicOptions}
                                                        control={form.control}
                                                        refetchCampaign={refetchCampaign}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Advanced mode */}
                                        <Disclosure as="div" className="flex flex-col justify-end">
                                            {({ open }) => (
                                                <>
                                                    {/* Button to display advanced mode */}
                                                    <Disclosure.Button className="flex items-center justify-end font-bold">
                                                        <span className="mr-2">{t('advanced-mode')}</span>
                                                        <span className="text-lg">
                                                            <Chevron direction="down" rotate={open} double={true} />
                                                        </span>
                                                    </Disclosure.Button>

                                                    {/* Advanced mode panel */}
                                                    <Transition>
                                                        <Disclosure.Panel
                                                            as="div"
                                                            className="mt-5 flex flex-col gap-y-3"
                                                        >
                                                            {/* Show responses from categories */}
                                                            {/* Do not display if 'healthwellbeing' and 'q2' */}
                                                            {!hideResponseTopicRelatedFilters &&
                                                                questionAskedCode !== 'q2' && (
                                                                    <div>
                                                                        <div className="mb-1 w-fit">
                                                                            {t('responses-from-categories')}
                                                                        </div>
                                                                        <SelectOnlyResponsesFromCategories
                                                                            id={`select-only-responses-from-categories-${id}`}
                                                                            dashboard={dashboard}
                                                                            options={onlyResponsesFromCategoriesOptions}
                                                                            control={form.control}
                                                                            refetchCampaign={refetchCampaign}
                                                                        />
                                                                    </div>
                                                                )}

                                                            {/* Filter by age or age ranges */}
                                                            <div>
                                                                <div
                                                                    className="mb-1 w-fit"
                                                                    data-tooltip-id="filters-panel-select-age"
                                                                >
                                                                    {/* The replace function is usd to replace a text within parenthesis from the translation */}
                                                                    {t('filter-by-age-or-select-histogram').replace(
                                                                        / *\([^)]*\) */g,
                                                                        ''
                                                                    )}
                                                                </div>
                                                                {dashboard === DashboardName.WHAT_WOMEN_WANT ||
                                                                dashboard === DashboardName.MIDWIVES_VOICES ? (
                                                                    <SelectAgeRanges
                                                                        id={`select-age-ranges-${id}`}
                                                                        dashboard={dashboard}
                                                                        options={ageRangeOptions}
                                                                        control={form.control}
                                                                        refetchCampaign={refetchCampaign}
                                                                    />
                                                                ) : (
                                                                    <SelectAges
                                                                        id={`select-ages-${id}`}
                                                                        dashboard={dashboard}
                                                                        options={ageOptions}
                                                                        control={form.control}
                                                                        refetchCampaign={refetchCampaign}
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* For whatyoungpeoplewant show select gender */}
                                                            {dashboard === DashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                                                                <>
                                                                    {/* Filter by gender */}
                                                                    <div className="flex gap-x-3">
                                                                        {/* Filter by gender */}
                                                                        <div className="flex basis-1/2 flex-col">
                                                                            <div className="mb-1">
                                                                                {t('filter-by-gender')}
                                                                            </div>
                                                                            <SelectGenders
                                                                                id={`select-genders-${id}`}
                                                                                dashboard={dashboard}
                                                                                options={genderOptions}
                                                                                control={form.control}
                                                                                refetchCampaign={refetchCampaign}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* For midwivesvoices show select gender and select profession */}
                                                            {dashboard === DashboardName.MIDWIVES_VOICES && (
                                                                <>
                                                                    {/* Filter by gender & filter by profession */}
                                                                    <div className="flex gap-x-3">
                                                                        {/* Filter by gender */}
                                                                        <div className="flex basis-1/2 flex-col justify-between">
                                                                            <div className="mb-1">
                                                                                {t('filter-by-gender')}
                                                                            </div>
                                                                            <SelectGenders
                                                                                id={`select-genders-${id}`}
                                                                                dashboard={dashboard}
                                                                                options={genderOptions}
                                                                                control={form.control}
                                                                                refetchCampaign={refetchCampaign}
                                                                            />
                                                                        </div>
                                                                        {/* Select profession */}
                                                                        <div className="flex basis-1/2 flex-col justify-between">
                                                                            <div className="mb-1">
                                                                                {t('select-profession')}
                                                                            </div>
                                                                            <SelectProfessions
                                                                                id={`select-professions-${id}`}
                                                                                dashboard={dashboard}
                                                                                options={professionOptions}
                                                                                control={form.control}
                                                                                refetchCampaign={refetchCampaign}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* Filter by keyword & exclude keyword */}
                                                            <div className="flex gap-x-3">
                                                                {/* Filter by keyword */}
                                                                <div className="flex basis-1/2 flex-col">
                                                                    <div
                                                                        className="mb-1 w-fit"
                                                                        data-tooltip-id="filters-panel-input-keyword"
                                                                    >
                                                                        {t('filter-by-keyword')}
                                                                    </div>
                                                                    <InputKeyword
                                                                        id={`input-keyword-${id}`}
                                                                        control={form.control}
                                                                        refetchCampaign={refetchCampaign}
                                                                    />
                                                                </div>
                                                                {/* Exclude keyword */}
                                                                <div className="flex basis-1/2 flex-col">
                                                                    <div
                                                                        className="mb-1 w-fit"
                                                                        data-tooltip-id="filters-panel-input-keyword"
                                                                    >
                                                                        {t('exclude-keyword')}
                                                                    </div>
                                                                    <InputExcludeKeyword
                                                                        id={`input-exclude-keyword-${id}`}
                                                                        control={form.control}
                                                                        refetchCampaign={refetchCampaign}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Show multi-word phrases */}
                                                            {id === 'tab-1' && (
                                                                <div className="flex flex-col">
                                                                    <div
                                                                        className="mb-1 w-fit"
                                                                        data-tooltip-id="filters-panel-select-only-multi-word-phrases"
                                                                    >
                                                                        {t('multi-word-phrases')}
                                                                    </div>
                                                                    <SelectOnlyMultiWordPhrasesContainingFilterTerm
                                                                        id={`select-only-multi-word-phrases-containing-filter-term-${id}`}
                                                                        dashboard={dashboard}
                                                                        options={
                                                                            onlyMultiWordPhrasesContainingFilterTermOptions
                                                                        }
                                                                        control={form.control}
                                                                        refetchCampaign={refetchCampaign}
                                                                    />
                                                                </div>
                                                            )}
                                                        </Disclosure.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Disclosure>
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    )}
                </Box>
            </div>

            {/* Stats */}
            <Stats dashboard={dashboard} lang={lang} />

            {/* PMNCH QR code */}
            {displayPmnchQrCode && (
                <div className="flex flex-col items-center">
                    <Image
                        className="w-full max-w-[24rem] xl:max-w-[18rem]"
                        src="/whatyoungpeoplewant/pmnch_qr_code.png"
                        alt="PMNCH QR code"
                        width={1117}
                        height={200}
                    />
                    <div className="font-1point8 text-pmnchColors-primary text-center text-4xl uppercase">
                        {t('scan-share-be-heard')}
                    </div>
                </div>
            )}
        </div>
    )
}

const InputKeyword = ({ id, control, refetchCampaign }: IInputProps) => {
    return (
        <Controller
            name="keyword_filter"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Input
                    id={id}
                    placeHolder={'Enter keyword...'}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const InputExcludeKeyword = ({ id, control, refetchCampaign }: IInputProps) => {
    return (
        <Controller
            name="keyword_exclude"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Input
                    id={id}
                    placeHolder={'Enter keyword...'}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectOnlyMultiWordPhrasesContainingFilterTerm = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="only_multi_word_phrases_containing_filter_term"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectSingleValue
                    id={id}
                    options={options}
                    value={value}
                    controllerRenderOnChange={onChange}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectProfessions = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="professions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectGenders = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="genders"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectOnlyResponsesFromCategories = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="only_responses_from_categories"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectSingleValue
                    id={id}
                    options={options}
                    value={value}
                    controllerRenderOnChange={onChange}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectResponseTopics = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="response_topics"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectRegions = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="regions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectCountries = ({ id, dashboard, options, control, refetchCampaign }: ISelectProps) => {
    // Set disabled
    let disabled = false
    if (
        dashboard === DashboardName.WHAT_WOMEN_WANT_PAKISTAN ||
        dashboard === DashboardName.ECONOMIC_EMPOWERMENT_MEXICO
    ) {
        disabled = true
    }

    return (
        <Controller
            name="countries"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    isDisabled={disabled}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectAges = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="ages"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}

const SelectAgeRanges = ({ id, options, control, refetchCampaign }: ISelectProps) => {
    return (
        <Controller
            name="age_ranges"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    onChange={refetchCampaign}
                />
            )}
        />
    )
}
