'use client'

import { Disclosure, Tab, Transition } from '@headlessui/react'
import { classNames } from '@utils'
import { DashboardName } from '@enums'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { MultiValue } from 'react-select'
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

interface IFiltersPanelProps {
    dashboard: string
    lang: string
}

interface IFieldProps {
    id: string
    customOnChange: () => void
}

interface ISelectProps extends IFieldProps {
    options: (Option<string> | Option<boolean>)[]
    control: Control<Filter, any>
}

interface ISelectCountriesProps extends ISelectProps {
    handleOnChangeSelectedOptions:
        | ((options: MultiValue<Option<string>>) => void)
        | ((options: MultiValue<Option<boolean>>) => void)
}

interface IInputProps extends IFieldProps {
    register: UseFormRegister<Filter>
}

export const FiltersPanel = ({ dashboard, lang }: IFiltersPanelProps) => {
    // Set filters
    const setFilters = useFiltersStore((state: IFiltersState) => state.setFilters)

    // Select options
    const [countryOptions, setCountryOptions] = useState<Option<string>[]>([])
    const [responseTopicOptions, setResponseTopicOptions] = useState<Option<string>[]>([])
    const [ageOptions, setAgeOptions] = useState<Option<string>[]>([])
    const [genderOptions, setGenderOptions] = useState<Option<string>[]>([])
    const [professionOptions, setProfessionOptions] = useState<Option<string>[]>([])
    const [onlyResponsesFromCategoriesOptions, setOnlyResponsesFromCategoriesOptions] = useState<Option<boolean>[]>([])
    const [onlyMultiWordPhrasesContainingFilterTermOptions, setOnlyMultiWordPhrasesContainingFilterTermOptions] =
        useState<Option<boolean>[]>([])

    // Selected countries option(s) for each filter
    const [selectedCountriesOptionsFilter1, setSelectedCountriesOptionsFilter1] = useState<MultiValue<Option<string>>>(
        []
    )
    const [selectedCountriesOptionsFilter2, setSelectedCountriesOptionsFilter2] = useState<MultiValue<Option<string>>>(
        []
    )

    // Select regions options(s) for each filter
    const [regionOptionsFilter1, setRegionOptionsFilter1] = useState<Option<string>[]>([])
    const [regionOptionsFilter2, setRegionOptionsFilter2] = useState<Option<string>[]>([])

    // Region options for each country
    const countriesRegionsOptions = useRef<ICountryRegionOption[]>([])

    // Refetch campaign timeout
    const refetchCampaignTimeout = useRef<NodeJS.Timeout>()

    // Form 1
    const form1 = useForm<Filter>({
        defaultValues: defaultFilterValues,
        resolver: zodResolver(filterSchema),
    })

    // Form 2
    const form2 = useForm<Filter>({
        defaultValues: defaultFilterValues,
        resolver: zodResolver(filterSchema),
    })

    // Tabs
    const tabs = [
        { id: '1', title: 'Drill down', form: form1 },
        { id: '2', title: 'Compare to...', form: form2 },
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
                countriesRegionsOptions.current = filterOptions.country_regions

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

    // Set regions of selected countries for filter 2
    useEffect(() => {
        SetRegionOptionsForFilter(selectedCountriesOptionsFilter1, setRegionOptionsFilter1, form1)
    }, [selectedCountriesOptionsFilter1, form1])

    // Set regions of selected countries for filter 2
    useEffect(() => {
        SetRegionOptionsForFilter(selectedCountriesOptionsFilter2, setRegionOptionsFilter2, form2)
    }, [selectedCountriesOptionsFilter2, form2])

    // Cleanup refetch campaign timeout
    useEffect(() => {
        return () => {
            if (refetchCampaignTimeout.current) {
                clearTimeout(refetchCampaignTimeout.current)
            }
        }
    }, [refetchCampaignTimeout])

    // Set region options for filter
    function SetRegionOptionsForFilter(
        selectedCountryOptionsFilter: MultiValue<Option<string>>,
        setRegionOptionsFilter: Dispatch<SetStateAction<Option<string>[]>>,
        form: UseFormReturn<Filter, any>
    ) {
        // Only display regions for 1 selected country
        if (selectedCountryOptionsFilter.length !== 1) {
            setRegionOptionsFilter([])
            form.setValue('regions', [])
            return
        }

        // Set region options for selected country
        const countryRegionOptions = countriesRegionsOptions.current.find((countryRegionOption) => {
            return countryRegionOption.country_alpha2_code === selectedCountryOptionsFilter[0].value
        })
        if (countryRegionOptions) {
            setRegionOptionsFilter(countryRegionOptions.options)
        }
    }

    // Handle on change selected countries for form 1
    function handleOnChangeSelectedCountriesOptionsFilter1(options: MultiValue<Option<string>>) {
        setSelectedCountriesOptionsFilter1(options)
    }

    // Handle on change selected countries for form 2
    function handleOnChangeSelectedCountriesOptionsFilter2(options: MultiValue<Option<string>>) {
        setSelectedCountriesOptionsFilter2(options)
    }

    // Refetch campaign
    function refetchCampaign() {
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
                                            <div className="mb-1">Select countries</div>
                                            <SelectCountries
                                                id={`select-countries-${id}`}
                                                options={countryOptions}
                                                control={form.control}
                                                customOnChange={refetchCampaign}
                                                handleOnChangeSelectedOptions={
                                                    id === '1'
                                                        ? handleOnChangeSelectedCountriesOptionsFilter1
                                                        : handleOnChangeSelectedCountriesOptionsFilter2
                                                }
                                            />
                                        </div>

                                        {/* Select regions */}
                                        <div>
                                            <div className="mb-1">Select regions</div>
                                            <SelectRegions
                                                id={`select-regions-${id}`}
                                                options={id === '1' ? regionOptionsFilter1 : regionOptionsFilter2}
                                                control={form.control}
                                                customOnChange={refetchCampaign}
                                            />
                                        </div>

                                        {/* Select response topics */}
                                        <div>
                                            <div className="mb-1">Select response {topicsText}</div>
                                            <SelectResponseTopics
                                                id={`select-response-topics-${id}`}
                                                options={responseTopicOptions}
                                                control={form.control}
                                                customOnChange={refetchCampaign}
                                            />
                                        </div>
                                    </div>

                                    {/* Advanced mode */}
                                    <Disclosure as="div" className="flex flex-col justify-end">
                                        {({ open }) => (
                                            <>
                                                {/* Button to display advanced mode */}
                                                <Disclosure.Button className="flex items-center justify-end font-bold">
                                                    <span className="sr-only">Open advanced mode</span>
                                                    <span className="mr-2">Advanced mode</span>
                                                    <span className="text-lg">
                                                        <Chevron direction="down" rotate={open} double={true} />
                                                    </span>
                                                </Disclosure.Button>

                                                {/* Advanced mode panel */}
                                                <Transition>
                                                    <Disclosure.Panel as="div" className="mt-5 flex flex-col gap-y-3">
                                                        {/* Show responses from categories */}
                                                        <div>
                                                            <div className="mb-1">Responses from categories</div>
                                                            <SelectOnlyResponsesFromCategories
                                                                id={`select-only-responses-from-categories-${id}`}
                                                                options={onlyResponsesFromCategoriesOptions}
                                                                control={form.control}
                                                                customOnChange={refetchCampaign}
                                                            />
                                                        </div>

                                                        {/* Filter by age */}
                                                        <div>
                                                            <div className="mb-1">
                                                                Filter by age (or select range in histogram)
                                                            </div>
                                                            <SelectAges
                                                                id={`select-ages-${id}`}
                                                                options={ageOptions}
                                                                control={form.control}
                                                                customOnChange={refetchCampaign}
                                                            />
                                                        </div>

                                                        {/* For whatyoungpeoplewant show select gender */}
                                                        {dashboard === DashboardName.WHAT_YOUNG_PEOPLE_WANT && (
                                                            <>
                                                                {/* Filter by gender */}
                                                                <div className="flex gap-x-3">
                                                                    {/* Filter by gender */}
                                                                    <div className="flex basis-1/2 flex-col">
                                                                        <div className="mb-1">Filter by gender</div>
                                                                        <SelectGenders
                                                                            id={`select-genders-${id}`}
                                                                            options={genderOptions}
                                                                            control={form.control}
                                                                            customOnChange={refetchCampaign}
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
                                                                        <div className="mb-1">Filter by gender</div>
                                                                        <SelectGenders
                                                                            id={`select-genders-${id}`}
                                                                            options={genderOptions}
                                                                            control={form.control}
                                                                            customOnChange={refetchCampaign}
                                                                        />
                                                                    </div>
                                                                    {/* Select profession */}
                                                                    <div className="flex basis-1/2 flex-col justify-between">
                                                                        <div className="mb-1">Select profession</div>
                                                                        <SelectProfessions
                                                                            id={`select-professions-${id}`}
                                                                            options={professionOptions}
                                                                            control={form.control}
                                                                            customOnChange={refetchCampaign}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {/* Filter by keyword & exclude keyword */}
                                                        <div className="flex gap-x-3">
                                                            {/* Filter by keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Filter by keyword</div>
                                                                <InputKeyword
                                                                    id={`input-keyword-${id}`}
                                                                    register={form.register}
                                                                    customOnChange={refetchCampaign}
                                                                />
                                                            </div>
                                                            {/* Exclude keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Exclude keyword</div>
                                                                <InputExcludeKeyword
                                                                    id={`input-exclude-keyword-${id}`}
                                                                    register={form.register}
                                                                    customOnChange={refetchCampaign}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Show multi-word phrases */}
                                                        <div className="flex flex-col">
                                                            <div className="mb-1">Multi-word phrases</div>
                                                            <SelectOnlyMultiWordPhrasesContainingFilterTerm
                                                                id={`select-only-multi-word-phrases-containing-filter-term-${id}`}
                                                                options={
                                                                    onlyMultiWordPhrasesContainingFilterTermOptions
                                                                }
                                                                control={form.control}
                                                                customOnChange={refetchCampaign}
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
                        Scan, share, and be heard!
                    </div>
                </div>
            )}
        </div>
    )
}

const InputKeyword = ({ id, customOnChange, register }: IInputProps) => {
    return (
        <input
            id={id}
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            {...register('keyword_filter', {
                onChange: customOnChange,
            })}
        />
    )
}

const InputExcludeKeyword = ({ id, customOnChange, register }: IInputProps) => {
    return (
        <input
            id={id}
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            {...register('keyword_exclude', {
                onChange: customOnChange,
            })}
        />
    )
}

const SelectOnlyMultiWordPhrasesContainingFilterTerm = ({ id, customOnChange, options, control }: ISelectProps) => {
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
                    customOnChange={customOnChange}
                />
            )}
        />
    )
}

const SelectProfessions = ({ id, customOnChange, options, control }: ISelectProps) => {
    return (
        <Controller
            name="professions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    customOnChange={customOnChange}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectGenders = ({ id, customOnChange, options, control }: ISelectProps) => {
    return (
        <Controller
            name="genders"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    customOnChange={customOnChange}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectOnlyResponsesFromCategories = ({ id, customOnChange, options, control }: ISelectProps) => {
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
                    customOnChange={customOnChange}
                />
            )}
        />
    )
}

const SelectResponseTopics = ({ id, customOnChange, options, control }: ISelectProps) => {
    return (
        <Controller
            name="response_topics"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    customOnChange={customOnChange}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectRegions = ({ id, customOnChange, options, control }: ISelectProps) => {
    return (
        <Controller
            name="regions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    customOnChange={customOnChange}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectCountries = ({
    id,
    customOnChange,
    options,
    control,
    handleOnChangeSelectedOptions,
}: ISelectCountriesProps) => {
    return (
        <Controller
            name="countries"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    customOnChange={customOnChange}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                    handleOnChangeSelectedOptions={handleOnChangeSelectedOptions}
                />
            )}
        />
    )
}

const SelectAges = ({ id, customOnChange, options, control }: ISelectProps) => {
    return (
        <Controller
            name="ages"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    customOnChange={customOnChange}
                    options={options}
                    controllerRenderOnChange={onChange}
                    value={value}
                />
            )}
        />
    )
}
