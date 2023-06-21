'use client'

import { Disclosure, Tab, Transition } from '@headlessui/react'
import { classNames } from '@utils'
import { DashboardName } from '@enums'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@components/Box'
import Image from 'next/image'
import { getCampaignFilterOptions } from '@services/wra-dashboard-api'
import { Option } from '@types'
import { ICountryRegionOption } from '@interfaces'
import { Control, Controller, useForm, UseFormRegister, UseFormReturn } from 'react-hook-form'
import { SelectMultiValues } from '@components/SelectMultiValues'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { Chevron } from '@components/Chevron'
import { IFiltersState, useFiltersStore } from '@stores/filters'
import { defaultFilterValues } from '@constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Filter, filterSchema } from '@schemas/filter'
import { Stats } from '@components/FiltersPanel/Stats'
import { useTranslation } from '@app/i18n/client'
import { IFilterFormsState, useFilterFormsStore } from '@stores/filter-forms'

interface IFiltersPanelProps {
    dashboard: string
    lang: string
}

interface IFieldProps {
    id: string
}

interface ISelectProps extends IFieldProps {
    dashboard: string
    options: (Option<string> | Option<boolean>)[]
    control: Control<Filter, any>
}

interface IInputProps extends IFieldProps {
    register: UseFormRegister<Filter>
}

export const FiltersPanel = ({ dashboard, lang }: IFiltersPanelProps) => {
    const setFilters = useFiltersStore((state: IFiltersState) => state.setFilters)
    const setForm1 = useFilterFormsStore((state: IFilterFormsState) => state.setForm1)
    const setForm2 = useFilterFormsStore((state: IFilterFormsState) => state.setForm2)

    const { t } = useTranslation(lang)

    // Select options
    const [countryOptions, setCountryOptions] = useState<Option<string>[]>([])
    const [responseTopicOptions, setResponseTopicOptions] = useState<Option<string>[]>([])
    const [ageOptions, setAgeOptions] = useState<Option<string>[]>([])
    const [genderOptions, setGenderOptions] = useState<Option<string>[]>([])
    const [professionOptions, setProfessionOptions] = useState<Option<string>[]>([])
    const [onlyResponsesFromCategoriesOptions, setOnlyResponsesFromCategoriesOptions] = useState<Option<boolean>[]>([])
    const [onlyMultiWordPhrasesContainingFilterTermOptions, setOnlyMultiWordPhrasesContainingFilterTermOptions] =
        useState<Option<boolean>[]>([])

    // Select regions options(s) for each filter
    const [regionOptionsFilter1, setRegionOptionsFilter1] = useState<Option<string>[]>([])
    const [regionOptionsFilter2, setRegionOptionsFilter2] = useState<Option<string>[]>([])

    // Region options for each country
    const [countriesRegionsOptions, setCountriesRegionsOptions] = useState<ICountryRegionOption[]>([])

    // Refetch campaign timeout
    const refetchCampaignTimeout = useRef<NodeJS.Timeout>()

    // Form 1
    const form1 = useForm<Filter>({
        defaultValues: defaultFilterValues,
        resolver: zodResolver(filterSchema),
    })
    setForm1(form1)

    // Form 2
    const form2 = useForm<Filter>({
        defaultValues: defaultFilterValues,
        resolver: zodResolver(filterSchema),
    })
    setForm2(form2)

    // For these countries, set the country as selected by default
    useEffect(() => {
        switch (dashboard) {
            case DashboardName.WWW_PAKISTAN:
                form1.setValue('countries', ['PK'])
                form2.setValue('countries', ['PK'])
                break
            case DashboardName.GIZ:
                form1.setValue('countries', ['MX'])
                form2.setValue('countries', ['MX'])
                break
        }
    }, [dashboard, form1, form2])

    // Tabs
    const tabs = [
        { id: '1', title: t('drill-down'), form: form1 },
        { id: '2', title: `${t('compare-to')}...`, form: form2 },
    ]

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnchColors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-defaultColors-tertiary'
    }

    // Set topics text
    let topicsText: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            topicsText = 'domains'
            break
        default:
            topicsText = 'topics'
    }

    // Whether the PMNCH QR code should be displayed
    const displayPmnchQrCode = dashboard === DashboardName.WHAT_YOUNG_PEOPLE_WANT

    // Fetch filter options
    useEffect(() => {
        getCampaignFilterOptions(dashboard, lang)
            .then((filterOptions) => {
                // Country options
                setCountryOptions(filterOptions.countries)

                // Country Regions options
                setCountriesRegionsOptions(filterOptions.country_regions)

                // Response topic options
                setResponseTopicOptions(filterOptions.response_topics)

                // Age options
                setAgeOptions(filterOptions.ages)

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
            })
            .catch(() => {})
    }, [dashboard, lang])

    // Set region options for filter
    const setRegionOptionsForFilter = useCallback(
        (
            selectedCountries: string[],
            setRegionOptionsFilter: Dispatch<SetStateAction<Option<string>[]>>,
            form: UseFormReturn<Filter, any>
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

    // Set regions of selected countries for filter 1
    const watchCountriesForm1 = form1.watch('countries')
    useEffect(() => {
        setRegionOptionsForFilter(watchCountriesForm1, setRegionOptionsFilter1, form1)
    }, [watchCountriesForm1, form1, setRegionOptionsForFilter])

    // Set regions of selected countries for filter 2
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

    // Refetch campaign on form change
    const form1Watch = form1.watch()
    const form2Watch = form2.watch()
    useEffect(() => {
        // Clear the current submit timeout
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

            // Update the filters store (when filters are updated, useCampaignQuery will refetch the campaign data)
            setFilters({ filter1: form1.getValues(), filter2: form2.getValues() })
        }, 250)
    }, [form1, form1Watch, form2, form2Watch, setFilters])

    // Set select response topics translation
    let selectResponseTopicsTranslation: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectResponseTopicsTranslation = t('select-response-domains')
            break
        default:
            selectResponseTopicsTranslation = t('select-response-topics')
    }

    return (
        <div>
            {/* Filters */}
            <div className="mb-5 w-full">
                <Box>
                    <Tab.Group>
                        <Tab.List className="mb-2 flex flex-col sm:flex-row">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full bg-grayLighter py-5 leading-5 shadow-sm ring-transparent ring-offset-2 focus:outline-none',
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
                                >
                                    {/* Normal mode */}
                                    <div className="mb-5 flex flex-col gap-y-3">
                                        {/* Select countries */}
                                        <div>
                                            <div className="mb-1">{t('select-countries')}</div>
                                            <SelectCountries
                                                id={`select-countries-${id}`}
                                                dashboard={dashboard}
                                                options={countryOptions}
                                                control={form.control}
                                            />
                                        </div>

                                        {/* Select regions */}
                                        <div>
                                            <div className="mb-1">{t('select-regions')}</div>
                                            <SelectRegions
                                                id={`select-regions-${id}`}
                                                dashboard={dashboard}
                                                options={id === '1' ? regionOptionsFilter1 : regionOptionsFilter2}
                                                control={form.control}
                                            />
                                        </div>

                                        {/* Select response topics */}
                                        <div>
                                            <div className="mb-1">{selectResponseTopicsTranslation}</div>
                                            <SelectResponseTopics
                                                id={`select-response-topics-${id}`}
                                                dashboard={dashboard}
                                                options={responseTopicOptions}
                                                control={form.control}
                                            />
                                        </div>
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
                                                    <Disclosure.Panel as="div" className="mt-5 flex flex-col gap-y-3">
                                                        {/* Show responses from categories */}
                                                        <div>
                                                            <div className="mb-1">{t('responses-from-categories')}</div>
                                                            <SelectOnlyResponsesFromCategories
                                                                id={`select-only-responses-from-categories-${id}`}
                                                                dashboard={dashboard}
                                                                options={onlyResponsesFromCategoriesOptions}
                                                                control={form.control}
                                                            />
                                                        </div>

                                                        {/* Filter by age */}
                                                        <div>
                                                            <div className="mb-1">
                                                                {t('filter-by-age-or-select-histogram')}
                                                            </div>
                                                            <SelectAges
                                                                id={`select-ages-${id}`}
                                                                dashboard={dashboard}
                                                                options={ageOptions}
                                                                control={form.control}
                                                            />
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
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {/* Filter by keyword & exclude keyword */}
                                                        <div className="flex gap-x-3">
                                                            {/* Filter by keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">{t('filter-by-keyword')}</div>
                                                                <InputKeyword
                                                                    id={`input-keyword-${id}`}
                                                                    register={form.register}
                                                                />
                                                            </div>
                                                            {/* Exclude keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">{t('exclude-keyword')}</div>
                                                                <InputExcludeKeyword
                                                                    id={`input-exclude-keyword-${id}`}
                                                                    register={form.register}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Show multi-word phrases */}
                                                        <div className="flex flex-col">
                                                            <div className="mb-1">{t('multi-word-phrases')}</div>
                                                            <SelectOnlyMultiWordPhrasesContainingFilterTerm
                                                                id={`select-only-multi-word-phrases-containing-filter-term-${id}`}
                                                                dashboard={dashboard}
                                                                options={
                                                                    onlyMultiWordPhrasesContainingFilterTermOptions
                                                                }
                                                                control={form.control}
                                                            />
                                                        </div>
                                                    </Disclosure.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Disclosure>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
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
                    <div className="text-center font-1point8 text-4xl uppercase text-pmnchColors-primary">
                        {t('scan-share-be-heard')}
                    </div>
                </div>
            )}
        </div>
    )
}

const InputKeyword = ({ id, register }: IInputProps) => {
    return (
        <input
            id={id}
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            {...register('keyword_filter')}
        />
    )
}

const InputExcludeKeyword = ({ id, register }: IInputProps) => {
    return (
        <input
            id={id}
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            {...register('keyword_exclude')}
        />
    )
}

const SelectOnlyMultiWordPhrasesContainingFilterTerm = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="only_multi_word_phrases_containing_filter_term"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectSingleValue id={id} options={options} value={value} controllerRenderOnChange={onChange} />
            )}
        />
    )
}

const SelectProfessions = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="professions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues id={id} options={options} controllerRenderOnChange={onChange} value={value} />
            )}
        />
    )
}

const SelectGenders = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="genders"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues id={id} options={options} controllerRenderOnChange={onChange} value={value} />
            )}
        />
    )
}

const SelectOnlyResponsesFromCategories = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="only_responses_from_categories"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectSingleValue id={id} options={options} value={value} controllerRenderOnChange={onChange} />
            )}
        />
    )
}

const SelectResponseTopics = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="response_topics"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues id={id} options={options} controllerRenderOnChange={onChange} value={value} />
            )}
        />
    )
}

const SelectRegions = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="regions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues id={id} options={options} controllerRenderOnChange={onChange} value={value} />
            )}
        />
    )
}

const SelectCountries = ({ id, dashboard, options, control }: ISelectProps) => {
    // Set disabled
    let disabled = false
    switch (dashboard) {
        case DashboardName.WWW_PAKISTAN:
            disabled = true
            break
        case DashboardName.GIZ:
            disabled = true
            break
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
                />
            )}
        />
    )
}

const SelectAges = ({ id, options, control }: ISelectProps) => {
    return (
        <Controller
            name="ages"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues id={id} options={options} controllerRenderOnChange={onChange} value={value} />
            )}
        />
    )
}
