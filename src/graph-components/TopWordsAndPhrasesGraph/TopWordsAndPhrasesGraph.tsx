'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { Spinner } from '@components/Spinner'
import { Tab } from '@headlessui/react'
import { classNames } from '@utils'
import React from 'react'
import { DashboardName } from '@enums'
import { TopWordsWordcloud } from 'graph-components/TopWordsAndPhrasesGraph/TopWordsWordcloud'
import { TopWords } from '@graph-components/TopWordsAndPhrasesGraph/TopWords'

interface ITopWordsAndPhrasesGraphProps {
    dashboard: string
}

export const TopWordsAndPhrasesGraph = ({ dashboard }: ITopWordsAndPhrasesGraphProps) => {
    // Campaign query
    const { data, isSuccess, isLoading, isRefetching, isError } = useCampaignQuery(dashboard)

    // Set selected tab classes
    let selectedTabClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            selectedTabClasses = 'border-t-pmnchColors-septenary'
            break
        default:
            selectedTabClasses = 'border-t-defaultColors-tertiary'
    }

    // Tabs
    const tabs = [
        {
            id: '1',
            title: 'Word cloud',
            content: data ? (
                <TopWordsWordcloud dashboard={dashboard} wordcloudWords={data.top_words_and_phrases.wordcloud_words} />
            ) : null,
        },
        {
            id: '2',
            title: 'Top words',
            content: data ? (
                <TopWords
                    dashboard={dashboard}
                    topWords={data.top_words_and_phrases.top_words}
                    filter1Description={data.filter_1_description}
                    filter2Description={data.filter_2_description}
                />
            ) : null,
        },
        { id: '3', title: 'Two word phases', content: <div>3</div> },
        { id: '4', title: 'Three word phases', content: <div>4</div> },
    ]

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Top words and phrases" />
            <p>{"Here's what people said in their own words:"}</p>

            {/* Error */}
            {isError && <div className="my-5 flex">Could not load data</div>}

            {/* Loading */}
            {(isLoading || isRefetching) && <Spinner dashboard={dashboard} />}

            {/* Success */}
            {isSuccess && !isRefetching && (
                <div className="mt-3 w-full">
                    <Tab.Group>
                        <Tab.List className="flex flex-col sm:flex-row">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full bg-grayLighter py-5 leading-5 shadow-sm ring-transparent ring-offset-2 focus:outline-none',
                                            selected ? `border-t-2 bg-white shadow-none ${selectedTabClasses}` : ''
                                        )
                                    }
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            {tabs.map(({ id, content }) => (
                                <Tab.Panel key={id} className="w-full">
                                    {content}
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            )}
        </Box>
    )
}
