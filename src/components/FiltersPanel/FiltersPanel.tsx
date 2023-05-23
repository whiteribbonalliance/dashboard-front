'use client'

import { Disclosure, Tab, Transition } from '@headlessui/react'
import { classNames, titleCase } from '@utils'
import { DashboardCode } from '@enums'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { Box } from '@components/Box'
import Image from 'next/image'
import { getCampaignFilterOptions } from '@services/wra-dashboard-api/api'
import { Option } from '@types'
import { ICampaignCountry, ICampaignFilter } from '@interfaces'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IFiltersPanelProps {
    dashboard: string
}

interface IChevronsDownProps {
    open: boolean
}

interface IFieldProps {
    submitData: () => void
}

interface ISelectProps extends IFieldProps {
    options: Option[]
    control: any
}

interface IInputProps extends IFieldProps {
    register: any
}

interface ISelectCountriesProps extends ISelectProps {
    handleOnChangeSelectedCountries: (options: MultiValue<Option>) => void
}

// Create the schema
const schema = yup.object().shape({
    countries: yup.array(),
    regions: yup.array(),
    age_buckets: yup.array(),
    genders: yup.array(),
    professions: yup.array(),
    response_topics: yup.array(),
    responses_from_categories_or_any: yup.bool(),
    keyword_filter: yup.string(),
    keyword_exclude: yup.string(),
    multi_word_phrases_filter_term_or_any: yup.bool(),
})

const tabs = [
    { id: 'drill-down', title: 'Drill down' },
    { id: 'compare-to', title: 'Compare to...' },
]

const responsesCategoriesOrAnyOptions: Option[] = [
    { value: true, label: 'Only show responses which match all these categories' },
    { value: false, label: 'Show responses in any of these categories' },
]

const multiWordPhrasesFilterTermOrAnyOptions: Option[] = [
    { value: true, label: 'Only show multi-word phrases containing filter term' },
    { value: false, label: 'Show all multi-word phrases' },
]

export const FiltersPanel = ({ dashboard }: IFiltersPanelProps) => {
    const [campaignCountries, setCampaignCountries] = useState<ICampaignCountry[]>([])

    // Select options
    const [countryOptions, setCountryOptions] = useState<Option[]>([])
    const [regionOptions, setRegionOptions] = useState<Option[]>([])
    const [responseTopicOptions, setResponseTopicOptions] = useState<Option[]>([])
    const [ageBucketOptions, setAgeBucketOptions] = useState<Option[]>([])
    const [genderOptions, setGenderOptions] = useState<Option[]>([])
    const [professionOptions, setProfessionOptions] = useState<Option[]>([])

    // Selected countries option(s)
    const [selectedCountryOptions, setSelectedCountryOptions] = useState<MultiValue<Option>>([])

    const {
        register,
        control,
        getValues,
        formState: { errors },
    } = useForm<ICampaignFilter>({
        resolver: yupResolver(schema),
    })

    // Fetch filter options
    useEffect(() => {
        getCampaignFilterOptions(dashboard)
            .then((filterOptions) => {
                // Countries
                const countryOptions = filterOptions.countries.map((country) => {
                    return { value: country.alpha2_code, label: country.name }
                })
                setCountryOptions(countryOptions)
                setCampaignCountries(filterOptions.countries)

                // Response topics
                const responseTopicOptions = filterOptions.response_topics.map((responseTopic) => {
                    return { value: responseTopic.code, label: responseTopic.name }
                })
                setResponseTopicOptions(responseTopicOptions)

                // Age bucket options
                const ageBucketOptions = filterOptions.age_buckets.map((ageBucket) => {
                    return { value: ageBucket, label: titleCase(ageBucket) }
                })
                setAgeBucketOptions(ageBucketOptions)

                // Gender options
                const genderOptions = filterOptions.genders.map((gender) => {
                    return { value: gender, label: gender }
                })
                setGenderOptions(genderOptions)

                // Profession options
                const professionOptions = filterOptions.professions.map((profession) => {
                    return { value: profession, label: titleCase(profession) }
                })
                setProfessionOptions(professionOptions)
            })
            .catch(() => {})
    }, [dashboard])

    // Set regions of selected countries
    useEffect(() => {
        // Only display regions for 1 selected country
        if (selectedCountryOptions.length !== 1) {
            setRegionOptions([])
            return
        }

        ;(async () => {
            const regionOptions: Option[] = []
            for (const countryOption of selectedCountryOptions) {
                const country = campaignCountries.find((country) => country.alpha2_code === countryOption.value)
                if (country) {
                    const countryRegionOptions = country.regions.map((region) => {
                        return { value: `${country.alpha2_code}:${region}`, label: region }
                    })
                    regionOptions.push(...countryRegionOptions)
                }
            }
            setRegionOptions(
                regionOptions.map((regionOption) => {
                    return { value: regionOption.value, label: regionOption.label }
                })
            )
        })()
    }, [dashboard, campaignCountries, selectedCountryOptions])

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case DashboardCode.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnch-colors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-default-colors-tertiary'
    }

    // Set topics text
    let topicsText: string
    switch (dashboard) {
        case DashboardCode.WHAT_YOUNG_PEOPLE_WANT:
            topicsText = 'domains'
            break
        default:
            topicsText = 'topics'
    }

    // Whether the PMNCH QR code should be displayed
    const displayPmnchQrCode = dashboard === DashboardCode.WHAT_YOUNG_PEOPLE_WANT

    // Handle on change selected countries
    function handleOnChangeSelectedCountries(options: MultiValue<Option>) {
        setSelectedCountryOptions(options)
    }

    // Submit data
    function submitData() {
        const data = getValues()
        console.log(data)
    }

    return (
        <div>
            {/* Filters */}
            <div className="mb-5 w-full">
                <Box>
                    <Tab.Group>
                        <Tab.List className="mb-2 flex flex-col p-1 sm:flex-row">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full bg-gray-lighter py-5 leading-5 shadow-sm ring-transparent ring-offset-2 focus:outline-none',
                                            selected ? `border-t-2 bg-white ${selectedTabClasses}` : ''
                                        )
                                    }
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                        </Tab.List>

                        <Tab.Panels>
                            {tabs.map((tab) => (
                                <Tab.Panel
                                    key={tab.id}
                                    className={classNames(
                                        'flex flex-col p-3 ring-transparent ring-offset-2 focus:outline-none'
                                    )}
                                >
                                    {/* Normal mode */}
                                    <div className="mb-5 flex flex-col gap-y-3">
                                        {/* Select countries */}
                                        <div>
                                            <div className="mb-1">Select countries</div>
                                            <SelectCountries
                                                handleOnChangeSelectedCountries={handleOnChangeSelectedCountries}
                                                options={countryOptions}
                                                control={control}
                                                submitData={submitData}
                                            />
                                        </div>

                                        {/* Select regions */}
                                        <div>
                                            <div className="mb-1">Select regions</div>
                                            <SelectRegions
                                                options={regionOptions}
                                                control={control}
                                                submitData={submitData}
                                            />
                                        </div>

                                        {/* Select response topics */}
                                        <div>
                                            <div className="mb-1">Select response {topicsText}</div>
                                            <SelectResponseTopics
                                                options={responseTopicOptions}
                                                control={control}
                                                submitData={submitData}
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
                                                    <ChevronsDown open={open} />
                                                </Disclosure.Button>

                                                {/* Advanced mode panel */}
                                                <Transition>
                                                    <Disclosure.Panel as="div" className="flex flex-col gap-y-3">
                                                        {/* Show responses from categories */}
                                                        <div>
                                                            <div className="mb-1">Responses from categories</div>
                                                            <SelectResponsesFromCategoriesOrAny
                                                                options={responsesCategoriesOrAnyOptions}
                                                                control={control}
                                                                submitData={submitData}
                                                            />
                                                        </div>

                                                        {/* Filter by age */}
                                                        <div>
                                                            <div className="mb-1">
                                                                Filter by age (or select range in histogram)
                                                            </div>
                                                            <SelectAgeBuckets
                                                                options={ageBucketOptions}
                                                                control={control}
                                                                submitData={submitData}
                                                            />
                                                        </div>

                                                        {/* For whatyoungpeoplewant show select gender */}
                                                        {dashboard === DashboardCode.WHAT_YOUNG_PEOPLE_WANT && (
                                                            <>
                                                                {/* Filter by gender */}
                                                                <div className="flex gap-x-3">
                                                                    {/* Filter by gender */}
                                                                    <div className="flex basis-1/2 flex-col">
                                                                        <div className="mb-1">Filter by gender</div>
                                                                        <SelectGenders
                                                                            options={genderOptions}
                                                                            control={control}
                                                                            submitData={submitData}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {/* For midwivesvoices show select gender and select profession */}
                                                        {dashboard === DashboardCode.MIDWIVES_VOICES && (
                                                            <>
                                                                {/* Filter by gender & filter by profession */}
                                                                <div className="flex gap-x-3">
                                                                    {/* Filter by gender */}
                                                                    <div className="flex basis-1/2 flex-col justify-between">
                                                                        <div className="mb-1">Filter by gender</div>
                                                                        <SelectGenders
                                                                            options={genderOptions}
                                                                            control={control}
                                                                            submitData={submitData}
                                                                        />
                                                                    </div>
                                                                    {/* Select profession */}
                                                                    <div className="flex basis-1/2 flex-col justify-between">
                                                                        <div className="mb-1">Select profession</div>
                                                                        <SelectProfessions
                                                                            options={professionOptions}
                                                                            control={control}
                                                                            submitData={submitData}
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
                                                                    register={register}
                                                                    submitData={submitData}
                                                                />
                                                            </div>
                                                            {/* Exclude keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Exclude keyword</div>
                                                                <InputExcludeKeyword
                                                                    register={register}
                                                                    submitData={submitData}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Show multi-word phrases */}
                                                        <div className="flex flex-col">
                                                            <div className="mb-1">Multi-word phrases</div>
                                                            <SelectMultiWordPhrasesFilterTermOrAny
                                                                options={multiWordPhrasesFilterTermOrAnyOptions}
                                                                control={control}
                                                                submitData={submitData}
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

            {/* Respondents and average age */}
            <div className="mb-5 flex w-full flex-row gap-x-3">
                <div className="flex basis-1/2 flex-col">
                    <Box>
                        <div className="text-2xl">0,000</div>
                        <div>All respondents</div>
                    </Box>
                </div>
                <div className="flex basis-1/2 flex-col">
                    <Box>
                        <div className="text-2xl">0-0</div>
                        <div>Average age</div>
                    </Box>
                </div>
            </div>

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
                    <div className="text-center font-1point8 text-4xl uppercase text-pmnch-colors-primary">
                        Scan, share, and be heard!
                    </div>
                </div>
            )}
        </div>
    )
}

const ChevronsDown = ({ open }: IChevronsDownProps) => {
    return (
        <div className={`flex cursor-pointer flex-col transition duration-100 ease-in-out ${open ? 'rotate-180' : ''}`}>
            <FontAwesomeIcon className="text-lg" icon={faChevronDown} />
            <FontAwesomeIcon className="mt-[-0.6rem] text-lg" icon={faChevronDown} />
        </div>
    )
}

const InputKeyword = ({ submitData, register }: IInputProps) => {
    return (
        <input
            id="input-keyword"
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            defaultValue=""
            {...register('keyword_filter', {
                onChange: () => submitData(),
            })}
        />
    )
}

const InputExcludeKeyword = ({ submitData, register }: IInputProps) => {
    return (
        <input
            id="input-exclude-keyword"
            type="text"
            className="w-0 min-w-full rounded-md border border-[#CCC] p-1.5"
            placeholder="Enter keyword..."
            defaultValue=""
            {...register('keyword_exclude', {
                onChange: () => submitData(),
            })}
        />
    )
}

const SelectMultiWordPhrasesFilterTermOrAny = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="multi_word_phrases_filter_term_or_any"
            control={control}
            defaultValue={false}
            render={({ field: { onChange } }) => (
                <Select
                    instanceId="select-multi-word-phrases-filter-term-or-any"
                    options={options}
                    onChange={(singleValueOption) => {
                        if (singleValueOption) {
                            onChange(singleValueOption.value)
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectProfessions = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="professions"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange } }) => (
                <Select
                    isMulti
                    instanceId="select-professions"
                    options={options}
                    onChange={(multiValueOption) => {
                        if (multiValueOption) {
                            onChange(multiValueOption.map((option) => option.value))
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectGenders = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="genders"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange } }) => (
                <Select
                    isMulti
                    instanceId="select-genders"
                    options={options}
                    onChange={(multiValueOption) => {
                        if (multiValueOption) {
                            onChange(multiValueOption.map((option) => option.value))
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectResponsesFromCategoriesOrAny = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="responses_from_categories_or_any"
            control={control}
            defaultValue={false}
            render={({ field: { onChange } }) => (
                <Select
                    instanceId="select-responses-from-categories-or-any"
                    options={options}
                    onChange={(SingleValueOption) => {
                        if (SingleValueOption) {
                            onChange(SingleValueOption.value)
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectResponseTopics = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="response_topics"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange } }) => (
                <Select
                    isMulti
                    instanceId="select-response-topics"
                    options={options}
                    onChange={(multiValueOption) => {
                        if (multiValueOption) {
                            onChange(multiValueOption.map((option) => option.value))
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectRegions = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="regions"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange } }) => (
                <Select
                    isMulti
                    instanceId="select-regions"
                    options={options}
                    onChange={(multiValueOption) => {
                        if (multiValueOption) {
                            onChange(multiValueOption.map((option) => option.value))
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectCountries = ({ submitData, options, control, handleOnChangeSelectedCountries }: ISelectCountriesProps) => {
    return (
        <Controller
            name="countries"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange } }) => (
                <Select
                    isMulti
                    instanceId="select-countries"
                    options={options}
                    onChange={(multiValueOption) => {
                        if (multiValueOption) {
                            onChange(multiValueOption.map((option) => option.value))
                        }
                        handleOnChangeSelectedCountries(multiValueOption)
                        submitData()
                    }}
                />
            )}
        />
    )
}

const SelectAgeBuckets = ({ submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="age_buckets"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange } }) => (
                <Select
                    isMulti
                    instanceId="select-age-buckets"
                    options={options}
                    onChange={(multiValueOption) => {
                        if (multiValueOption) {
                            onChange(multiValueOption.map((option) => option.value))
                        }
                        submitData()
                    }}
                />
            )}
        />
    )
}
