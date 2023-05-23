'use client'

import { Disclosure, Tab, Transition } from '@headlessui/react'
import { classNames, titleCase } from '@utils'
import { DashboardName } from '@enums'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { Box } from '@components/Box'
import Image from 'next/image'
import { getCampaign, getCampaignFilterOptions } from '@services/wra-dashboard-api/api'
import { Option } from '@types'
import { ICampaignRequest, ICountry, IFilter } from '@interfaces'
import { Control, Controller, useForm, UseFormRegister } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IFiltersPanelProps {
    dashboard: string
}

interface IChevronsDownProps {
    open: boolean
}

interface IFieldProps {
    id: string
    submitData: () => void
}

interface ISelectProps extends IFieldProps {
    options: Option[]
    control: Control<IFilter, any>
}

interface IInputProps extends IFieldProps {
    register: UseFormRegister<IFilter>
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
    only_responses_from_categories: yup.bool(),
    only_multi_word_phrases_containing_filter_term: yup.bool(),
    keyword_filter: yup.string(),
    keyword_exclude: yup.string(),
})

const onlyResponsesFromCategoriesOptions: Option[] = [
    { value: true, label: 'Only show responses which match all these categories' },
    { value: false, label: 'Show responses in any of these categories' },
]

const onlyMultiWordPhrasesContainingFilterTermOptions: Option[] = [
    { value: true, label: 'Only show multi-word phrases containing filter term' },
    { value: false, label: 'Show all multi-word phrases' },
]

export const FiltersPanel = ({ dashboard }: IFiltersPanelProps) => {
    const [campaignCountries, setCampaignCountries] = useState<ICountry[]>([])

    // Select options
    const [countryOptions, setCountryOptions] = useState<Option[]>([])
    const [regionOptions, setRegionOptions] = useState<Option[]>([])
    const [responseTopicOptions, setResponseTopicOptions] = useState<Option[]>([])
    const [ageBucketOptions, setAgeBucketOptions] = useState<Option[]>([])
    const [genderOptions, setGenderOptions] = useState<Option[]>([])
    const [professionOptions, setProfessionOptions] = useState<Option[]>([])

    // Selected countries option(s)
    const [selectedCountryOptions, setSelectedCountryOptions] = useState<MultiValue<Option>>([])

    // Submit timeout
    const submitTimeout = useRef<NodeJS.Timeout>()

    // Form: filter 1
    const form_1 = useForm<IFilter>({
        resolver: yupResolver(schema),
    })

    // Form: filter 2
    const form_2 = useForm<IFilter>({
        resolver: yupResolver(schema),
    })

    // Tabs
    const tabs = [
        { id: '1', title: 'Drill down', form: form_1 },
        { id: '2', title: 'Compare to...', form: form_2 },
    ]

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
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnch-colors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-default-colors-tertiary'
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

    // Handle on change selected countries
    function handleOnChangeSelectedCountries(options: MultiValue<Option>) {
        setSelectedCountryOptions(options)
    }

    // Submit data
    function submitData() {
        // Clear the current submit timeout
        if (submitTimeout.current) {
            clearTimeout(submitTimeout.current)
        }

        // Add a small delay before submitting data
        submitTimeout.current = setTimeout(() => {
            const data = form_1.getValues()
            // TODO: Set filter data for each tab
            const campaignRequest: ICampaignRequest = { filter_1: data, filter_2: data }
            getCampaign(dashboard, campaignRequest)
                .then((campaign) => {
                    console.log(campaign)
                })
                .catch(() => {})
        }, 400)
    }

    // Cleanup submit timeout
    useEffect(() => {
        return () => {
            if (submitTimeout.current) {
                clearTimeout(submitTimeout.current)
            }
        }
    }, [submitTimeout])

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
                            {tabs.map(({ id, form }) => (
                                <Tab.Panel
                                    key={id}
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
                                                id={`select-countries-${id}`}
                                                handleOnChangeSelectedCountries={handleOnChangeSelectedCountries}
                                                options={countryOptions}
                                                control={form.control}
                                                submitData={submitData}
                                            />
                                        </div>

                                        {/* Select regions */}
                                        <div>
                                            <div className="mb-1">Select regions</div>
                                            <SelectRegions
                                                id={`select-regions-${id}`}
                                                options={regionOptions}
                                                control={form.control}
                                                submitData={submitData}
                                            />
                                        </div>

                                        {/* Select response topics */}
                                        <div>
                                            <div className="mb-1">Select response {topicsText}</div>
                                            <SelectResponseTopics
                                                id={`select-response-topics-${id}`}
                                                options={responseTopicOptions}
                                                control={form.control}
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
                                                            <SelectOnlyResponsesFromCategories
                                                                id={`select-only-responses-from-categories-${id}`}
                                                                options={onlyResponsesFromCategoriesOptions}
                                                                control={form.control}
                                                                submitData={submitData}
                                                            />
                                                        </div>

                                                        {/* Filter by age */}
                                                        <div>
                                                            <div className="mb-1">
                                                                Filter by age (or select range in histogram)
                                                            </div>
                                                            <SelectAgeBuckets
                                                                id={`select-age-buckets-${id}`}
                                                                options={ageBucketOptions}
                                                                control={form.control}
                                                                submitData={submitData}
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
                                                                            submitData={submitData}
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
                                                                            submitData={submitData}
                                                                        />
                                                                    </div>
                                                                    {/* Select profession */}
                                                                    <div className="flex basis-1/2 flex-col justify-between">
                                                                        <div className="mb-1">Select profession</div>
                                                                        <SelectProfessions
                                                                            id={`select-professions-${id}`}
                                                                            options={professionOptions}
                                                                            control={form.control}
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
                                                                    id={`input-keyword-${id}`}
                                                                    register={form.register}
                                                                    submitData={submitData}
                                                                />
                                                            </div>
                                                            {/* Exclude keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Exclude keyword</div>
                                                                <InputExcludeKeyword
                                                                    id={`input-exclude-keyword-${id}`}
                                                                    register={form.register}
                                                                    submitData={submitData}
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

const InputKeyword = ({ id, submitData, register }: IInputProps) => {
    return (
        <input
            id={id}
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

const InputExcludeKeyword = ({ id, submitData, register }: IInputProps) => {
    return (
        <input
            id={id}
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

const SelectOnlyMultiWordPhrasesContainingFilterTerm = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="only_multi_word_phrases_containing_filter_term"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
                <Select
                    instanceId={id}
                    options={options}
                    value={options.find((option) => option.value === value)}
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

const SelectProfessions = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="professions"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
                <Select
                    isMulti
                    instanceId={id}
                    options={options}
                    value={value.map((selectedVal) => {
                        const option = options.find((option) => option.value === selectedVal) || {
                            value: '',
                            label: '',
                        }
                        return { value: option.value, label: option.label }
                    })}
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

const SelectGenders = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="genders"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
                <Select
                    isMulti
                    instanceId={id}
                    options={options}
                    value={value.map((selectedVal) => {
                        const option = options.find((option) => option.value === selectedVal) || {
                            value: '',
                            label: '',
                        }
                        return { value: option.value, label: option.label }
                    })}
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

const SelectOnlyResponsesFromCategories = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="only_responses_from_categories"
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
                <Select
                    instanceId={id}
                    options={options}
                    value={options.find((option) => option.value === value)}
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

const SelectResponseTopics = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="response_topics"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
                <Select
                    isMulti
                    instanceId={id}
                    options={options}
                    value={value.map((selectedVal) => {
                        const option = options.find((option) => option.value === selectedVal) || {
                            value: '',
                            label: '',
                        }
                        return { value: option.value, label: option.label }
                    })}
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

const SelectRegions = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="regions"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
                <Select
                    isMulti
                    instanceId={id}
                    options={options}
                    value={value.map((selectedVal) => {
                        const option = options.find((option) => option.value === selectedVal) || {
                            value: '',
                            label: '',
                        }
                        return { value: option.value, label: option.label }
                    })}
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

const SelectCountries = ({
    id,
    submitData,
    options,
    control,
    handleOnChangeSelectedCountries,
}: ISelectCountriesProps) => {
    return (
        <Controller
            name="countries"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
                <Select
                    isMulti
                    instanceId={id}
                    options={options}
                    value={value.map((selectedVal) => {
                        const option = options.find((option) => option.value === selectedVal) || {
                            value: '',
                            label: '',
                        }
                        return { value: option.value, label: option.label }
                    })}
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

const SelectAgeBuckets = ({ id, submitData, options, control }: ISelectProps) => {
    return (
        <Controller
            name="age_buckets"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
                <Select
                    isMulti
                    instanceId={id}
                    options={options}
                    value={value.map((selectedVal) => {
                        const option = options.find((option) => option.value === selectedVal) || {
                            value: '',
                            label: '',
                        }
                        return { value: option.value, label: option.label }
                    })}
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
