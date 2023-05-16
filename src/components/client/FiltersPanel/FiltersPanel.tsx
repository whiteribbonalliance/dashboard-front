'use client'

import { Tab } from '@headlessui/react'
import { classNames } from '@utils'
import { Dashboards } from '@enums'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Select from 'react-select'

interface IFiltersPanelProps {
    dashboard: string
}

const tabs = [
    { id: 'drill-down', title: 'Drill Down' },
    { id: 'compare-to', title: 'Compare To...' },
]

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]

export const FiltersPanel = ({ dashboard }: IFiltersPanelProps) => {
    const [showAdvancedMode, setShowAdvancedMode] = useState<boolean>(false)

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnch-colors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-default-colors-tertiary'
    }

    return (
        <>
            <div className="mb-3 w-full rounded-md bg-gray-light p-4">
                <Tab.Group>
                    <Tab.List className="mb-2 flex p-1">
                        {tabs.map((tab) => (
                            <Tab
                                key={tab.id}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full bg-gray-lighter py-2.5 leading-5 shadow-sm ring-transparent ring-offset-2 focus:outline-none',
                                        selected ? `border-t-2 bg-white py-5 ${selectedTabClasses}` : ''
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
                                {/* Select countries */}
                                <div className="mb-3 flex flex-col">
                                    <div className="mb-1">Select countries</div>
                                    <Select options={options} />
                                </div>

                                {/* Select regions */}
                                <div className="mb-3">
                                    <div className="mb-1">Select regions</div>
                                    <Select options={options} />
                                </div>

                                {/* Select response topics */}
                                <div className="mb-5">
                                    <div className="mb-1">Select response topics</div>
                                    <Select options={options} />
                                </div>

                                {/* Advanced mode */}
                                <div className="flex items-center justify-end font-bold">
                                    <span className="mr-2">Advanced mode</span>
                                    <div
                                        className={`flex cursor-pointer flex-col transition duration-100 ease-in-out xl:hidden ${
                                            showAdvancedMode ? 'rotate-180' : ''
                                        }`}
                                        onClick={() => setShowAdvancedMode((prev) => !prev)}
                                    >
                                        <FontAwesomeIcon className="text-lg" icon={faChevronDown} />
                                        <FontAwesomeIcon className="mt-[-0.6rem] text-lg" icon={faChevronDown} />
                                    </div>
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Respondents and average age */}
            <div className="flex w-full gap-x-3">
                <div className="flex w-full basis-1/2 flex-col rounded-md bg-gray-light p-4">
                    <div className="text-2xl">0</div>
                    <div>All respondents</div>
                </div>
                <div className="flex w-full basis-1/2 flex-col rounded-md bg-gray-light p-4">
                    <div className="text-2xl">0</div>
                    <div>Average age</div>
                </div>
            </div>
        </>
    )
}
