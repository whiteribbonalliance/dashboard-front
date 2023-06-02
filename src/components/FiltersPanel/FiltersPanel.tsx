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
}

interface IFieldProps {
    id: string
    refetchCampaign: () => void
}

interface ISelectProps extends IFieldProps {
    options: Option[]
    control: Control<Filter, any>
}

interface ISelectCountriesProps extends ISelectProps {
    handleOnChangeSelectedOptions: (options: MultiValue<Option>) => void
}

interface IInputProps extends IFieldProps {
    register: UseFormRegister<Filter>
}

export const FiltersPanel = ({ dashboard }: IFiltersPanelProps) => {
    // Set filters
    const setFilters = useFiltersStore((state: IFiltersState) => state.setFilters)

    // Select options
    const [countryOptions, setCountryOptions] = useState<Option[]>([])
    const [responseTopicOptions, setResponseTopicOptions] = useState<Option[]>([])
    const [ageOptions, setAgeOptions] = useState<Option[]>([])
    const [genderOptions, setGenderOptions] = useState<Option[]>([])
    const [professionOptions, setProfessionOptions] = useState<Option[]>([])
    const [onlyResponsesFromCategoriesOptions, setOnlyResponsesFromCategoriesOptions] = useState<Option[]>([])
    const [onlyMultiWordPhrasesContainingFilterTermOptions, setOnlyMultiWordPhrasesContainingFilterTermOptions] =
        useState<Option[]>([])

    // Selected countries option(s) for each filter
    const [selectedCountriesOptionsFilter1, setSelectedCountriesOptionsFilter1] = useState<MultiValue<Option>>([])
    const [selectedCountriesOptionsFilter2, setSelectedCountriesOptionsFilter2] = useState<MultiValue<Option>>([])

    // Select regions options(s) for each filter
    const [regionOptionsFilter1, setRegionOptionsFilter1] = useState<Option[]>([])
    const [regionOptionsFilter2, setRegionOptionsFilter2] = useState<Option[]>([])

    // Region options for each country
    const countriesRegionsOptions = useRef<ICountryRegionOption[]>([])

    // Refetch campaign timeout
    const refetchCampaignTimeout = useRef<NodeJS.Timeout>()

    // Filter 1
    const filter1 = useForm<Filter>({
        defaultValues: defaultFilterValues,
        resolver: zodResolver(filterSchema),
    })

    // Filter 2
    const filter2 = useForm<Filter>({
        defaultValues: defaultFilterValues,
        resolver: zodResolver(filterSchema),
    })

    // Tabs
    const tabs = [
        { id: '1', title: 'Drill down', form: filter1 },
        { id: '2', title: 'Compare to...', form: filter2 },
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
        getCampaignFilterOptions(dashboard)
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
    }, [dashboard])

    // Set regions of selected countries for filter 2
    useEffect(() => {
        SetRegionOptionsForFilter(selectedCountriesOptionsFilter1, setRegionOptionsFilter1, filter1)
    }, [selectedCountriesOptionsFilter1, filter1])

    // Set regions of selected countries for filter 2
    useEffect(() => {
        SetRegionOptionsForFilter(selectedCountriesOptionsFilter2, setRegionOptionsFilter2, filter2)
    }, [selectedCountriesOptionsFilter2, filter2])

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
        selectedCountryOptionsFilter: MultiValue<Option>,
        setRegionOptionsFilter: Dispatch<SetStateAction<Option[]>>,
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

    // Handle on change selected countries for filter 1
    function handleOnChangeSelectedCountriesOptionsFilter1(options: MultiValue<Option>) {
        setSelectedCountriesOptionsFilter1(options)
    }

    // Handle on change selected countries for filter 2
    function handleOnChangeSelectedCountriesOptionsFilter2(options: MultiValue<Option>) {
        setSelectedCountriesOptionsFilter2(options)
    }

    // On filter change
    function onFilterChange() {
        // Clear the current submit timeout
        if (refetchCampaignTimeout.current) {
            clearTimeout(refetchCampaignTimeout.current)
        }

        // Add a small delay before refetching campaign
        refetchCampaignTimeout.current = setTimeout(() => {
            // Lowercase keyword_exclude and keyword_filter
            if (filter1.getValues().keyword_exclude) {
                filter1.getValues().keyword_exclude = filter1.getValues().keyword_exclude.toLowerCase()
            }
            if (filter1.getValues().keyword_filter) {
                filter1.getValues().keyword_filter = filter1.getValues().keyword_filter.toLowerCase()
            }

            // Lowercase keyword_exclude and keyword_filter
            if (filter2.getValues().keyword_exclude) {
                filter2.getValues().keyword_exclude = filter2.getValues().keyword_exclude.toLowerCase()
            }
            if (filter2.getValues().keyword_filter) {
                filter2.getValues().keyword_filter = filter2.getValues().keyword_filter.toLowerCase()
            }

            // Update the filters store (when filters are updated, useCampaignQuery will refetch the campaign data)
            setFilters({ filter1: filter1.getValues(), filter2: filter2.getValues() })
        }, 450)
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
                                                refetchCampaign={onFilterChange}
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
                                                refetchCampaign={onFilterChange}
                                            />
                                        </div>

                                        {/* Select response topics */}
                                        <div>
                                            <div className="mb-1">Select response {topicsText}</div>
                                            <SelectResponseTopics
                                                id={`select-response-topics-${id}`}
                                                options={responseTopicOptions}
                                                control={form.control}
                                                refetchCampaign={onFilterChange}
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
                                                    <Disclosure.Panel as="div" className="flex flex-col gap-y-3">
                                                        {/* Show responses from categories */}
                                                        <div>
                                                            <div className="mb-1">Responses from categories</div>
                                                            <SelectOnlyResponsesFromCategories
                                                                id={`select-only-responses-from-categories-${id}`}
                                                                options={onlyResponsesFromCategoriesOptions}
                                                                control={form.control}
                                                                refetchCampaign={onFilterChange}
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
                                                                refetchCampaign={onFilterChange}
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
                                                                            refetchCampaign={onFilterChange}
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
                                                                            refetchCampaign={onFilterChange}
                                                                        />
                                                                    </div>
                                                                    {/* Select profession */}
                                                                    <div className="flex basis-1/2 flex-col justify-between">
                                                                        <div className="mb-1">Select profession</div>
                                                                        <SelectProfessions
                                                                            id={`select-professions-${id}`}
                                                                            options={professionOptions}
                                                                            control={form.control}
                                                                            refetchCampaign={onFilterChange}
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
                                                                    refetchCampaign={onFilterChange}
                                                                />
                                                            </div>
                                                            {/* Exclude keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Exclude keyword</div>
                                                                <InputExcludeKeyword
                                                                    id={`input-exclude-keyword-${id}`}
                                                                    register={form.register}
                                                                    refetchCampaign={onFilterChange}
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
                                                                refetchCampaign={onFilterChange}
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
            <Stats dashboard={dashboard} />

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

const InputKeyword = ({ id, refetchCampaign, register }: IInputProps) => {
    return (
        <input
            id={id}
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            {...register('keyword_filter', {
                onChange: refetchCampaign,
            })}
        />
    )
}

const InputExcludeKeyword = ({ id, refetchCampaign, register }: IInputProps) => {
    return (
        <input
            id={id}
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            {...register('keyword_exclude', {
                onChange: refetchCampaign,
            })}
        />
    )
}

const SelectOnlyMultiWordPhrasesContainingFilterTerm = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="only_multi_word_phrases_containing_filter_term"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectSingleValue
                    id={id}
                    options={options}
                    value={value}
                    onChange={onChange}
                    refetchCampaign={refetchCampaign}
                />
            )}
        />
    )
}

const SelectProfessions = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="professions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    refetchCampaign={refetchCampaign}
                    options={options}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectGenders = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="genders"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    refetchCampaign={refetchCampaign}
                    options={options}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectOnlyResponsesFromCategories = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="only_responses_from_categories"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectSingleValue
                    id={id}
                    options={options}
                    value={value}
                    onChange={onChange}
                    refetchCampaign={refetchCampaign}
                />
            )}
        />
    )
}

const SelectResponseTopics = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="response_topics"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    refetchCampaign={refetchCampaign}
                    options={options}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectRegions = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="regions"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    refetchCampaign={refetchCampaign}
                    options={options}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}

const SelectCountries = ({
    id,
    refetchCampaign,
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
                    refetchCampaign={refetchCampaign}
                    options={options}
                    onChange={onChange}
                    value={value}
                    handleOnChangeSelectedOptions={handleOnChangeSelectedOptions}
                />
            )}
        />
    )
}

const SelectAges = ({ id, refetchCampaign, options, control }: ISelectProps) => {
    return (
        <Controller
            name="ages"
            control={control}
            render={({ field: { onChange, value } }) => (
                <SelectMultiValues
                    id={id}
                    refetchCampaign={refetchCampaign}
                    options={options}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    )
}
