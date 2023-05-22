'use client'

import { Disclosure, Tab, Transition } from '@headlessui/react'
import { classNames } from '@utils'
import { Dashboards } from '@enums'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { Box } from '@components/Box'
import Image from 'next/image'
import { getCampaignFilterOptions } from '@services/wra-dashboard-api/api'
import { Option } from '@types'
import { ICampaignCountry } from '@interfaces'

interface IFiltersPanelProps {
    dashboard: string
}

interface IChevronsDownProps {
    open: boolean
}

interface ISelectProps {
    options: Option[]
}

interface ISelectCountriesProps extends ISelectProps {
    handleSelectedCountries: (options: MultiValue<Option>) => void
}

const tabs = [
    { id: 'drill-down', title: 'Drill down' },
    { id: 'compare-to', title: 'Compare to...' },
]

const onlyShowResponsesCategoriesOptions: Option[] = [
    { value: true, label: 'Only show responses which match all these categories' },
    { value: false, label: 'Show responses in any of these categories' },
]

const onlyShowMultiWordPhrasesContainingFilterTermOptions: Option[] = [
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

    // Selected option(s)
    const [selectedCountryOptions, setSelectedCountryOptions] = useState<MultiValue<Option>>([])

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
                    return { value: ageBucket, label: ageBucket }
                })
                setAgeBucketOptions(ageBucketOptions)

                // Gender options
                const genderOptions = filterOptions.genders.map((gender) => {
                    return { value: gender, label: gender }
                })
                setGenderOptions(genderOptions)

                // Profession options
                const professionOptions = filterOptions.professions.map((profession) => {
                    return { value: profession, label: profession }
                })
                setProfessionOptions(professionOptions)
            })
            .catch(() => {})
    }, [dashboard])

    // Set regions of selected countries
    useEffect(() => {
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

    // Handle selected countries
    function handleSelectedCountries(options: MultiValue<Option>) {
        setSelectedCountryOptions(options)
    }

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnch-colors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-default-colors-tertiary'
    }

    // Set topics text
    let topicsText: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            topicsText = 'domains'
            break
        default:
            topicsText = 'topics'
    }

    // Whether the PMNCH QR code should be displayed
    const displayPmnchQrCode = dashboard === Dashboards.WHAT_YOUNG_PEOPLE_WANT

    return (
        <aside>
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
                                                options={countryOptions}
                                                handleSelectedCountries={handleSelectedCountries}
                                            />
                                        </div>

                                        {/* Select regions */}
                                        <div>
                                            <div className="mb-1">Select regions</div>
                                            <SelectRegions options={regionOptions} />
                                        </div>

                                        {/* Select response topics */}
                                        <div>
                                            <div className="mb-1">Select response {topicsText}</div>
                                            <SelectResponseTopics options={responseTopicOptions} />
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
                                                            <SelectOnlyShowResponsesCategories
                                                                options={onlyShowResponsesCategoriesOptions}
                                                            />
                                                        </div>

                                                        {/* Filter by age */}
                                                        <div>
                                                            <div className="mb-1">
                                                                Filter by age (or select range in histogram)
                                                                <SelectFilterAgeBucket options={ageBucketOptions} />
                                                            </div>
                                                        </div>

                                                        {/* For whatyoungpeoplewant show select gender */}
                                                        {dashboard === Dashboards.WHAT_YOUNG_PEOPLE_WANT && (
                                                            <>
                                                                {/* Filter by gender */}
                                                                <div className="flex gap-x-3">
                                                                    {/* Filter by gender */}
                                                                    <div className="flex basis-1/2 flex-col">
                                                                        <div className="mb-1">Filter by gender</div>
                                                                        <SelectGender options={genderOptions} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {/* For midwivesvoices show select gender and select profession */}
                                                        {dashboard === Dashboards.MIDWIVES_VOICES && (
                                                            <>
                                                                {/* Filter by gender & filter by profession */}
                                                                <div className="flex gap-x-3">
                                                                    {/* Filter by gender */}
                                                                    <div className="flex basis-1/2 flex-col">
                                                                        <div className="mb-1">Filter by gender</div>
                                                                        <SelectGender options={genderOptions} />
                                                                    </div>
                                                                    {/* Select profession */}
                                                                    <div className="flex basis-1/2 flex-col">
                                                                        <div className="mb-1">Select profession</div>
                                                                        <SelectProfession options={professionOptions} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {/* Filter by keyword & exclude keyword */}
                                                        <div className="flex gap-x-3">
                                                            {/* Filter by keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Filter by keyword</div>
                                                                <InputKeyword />
                                                            </div>
                                                            {/* Exclude keyword */}
                                                            <div className="flex basis-1/2 flex-col">
                                                                <div className="mb-1">Exclude keyword</div>
                                                                <InputExcludeKeyword />
                                                            </div>
                                                        </div>

                                                        {/* Show multi-word phrases */}
                                                        <div className="flex flex-col">
                                                            <div className="mb-1">Multi-word phrases</div>
                                                            <OnlyShowMultiWordPhrasesContainingFilterTerm
                                                                options={
                                                                    onlyShowMultiWordPhrasesContainingFilterTermOptions
                                                                }
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
        </aside>
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

const InputKeyword = () => {
    return <input id="input-keyword" className="rounded-md border border-[#CCC] p-1.5" />
}

const InputExcludeKeyword = () => {
    return <input id="input-exclude-keyword" className="rounded-md border border-[#CCC] p-1.5" />
}

const OnlyShowMultiWordPhrasesContainingFilterTerm = ({ options }: ISelectProps) => {
    return <Select instanceId="select-show-multi-word-phrases" options={options} />
}

const SelectProfession = ({ options }: ISelectProps) => {
    return <Select instanceId="select-profession" options={options} />
}

const SelectGender = ({ options }: ISelectProps) => {
    return <Select instanceId="select-gender" options={options} />
}

const SelectOnlyShowResponsesCategories = ({ options }: ISelectProps) => {
    return <Select instanceId="select-only-show-responses-categories" options={options} />
}

const SelectResponseTopics = ({ options }: ISelectProps) => {
    return <Select instanceId="select-response-topics" options={options} isMulti />
}

const SelectRegions = ({ options }: ISelectProps) => {
    return <Select instanceId="select-regions" options={options} isMulti />
}

const SelectCountries = ({ options, handleSelectedCountries }: ISelectCountriesProps) => {
    return (
        <Select
            instanceId="select-countries"
            options={options}
            isMulti
            onChange={(options) => handleSelectedCountries(options)}
        />
    )
}

const SelectFilterAgeBucket = ({ options }: ISelectProps) => {
    return <Select instanceId="select-filter-age-bucket" options={options} isMulti />
}
