'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { Tab } from '@headlessui/react'
import { classNames } from '@utils'
import React from 'react'
import { DashboardName } from '@enums'
import { TopWordsWordcloud } from 'graph-components/TopWordsAndPhrasesGraph/TopWordsWordcloud'
import { TopWordsOrPhrases } from 'graph-components/TopWordsAndPhrasesGraph/TopWordsOrPhrases'
import { Loading } from '@components/Loading'

interface ITopWordsAndPhrasesGraphProps {
    dashboard: string
}

export const TopWordsAndPhrasesGraph = ({ dashboard }: ITopWordsAndPhrasesGraphProps) => {
    // Campaign query
    const { data, isError } = useCampaignQuery(dashboard)

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
            id: 'word-cloud',
            title: 'Word cloud',
            content: data ? (
                <TopWordsWordcloud dashboard={dashboard} wordcloudWords={data.top_words_and_phrases.wordcloud_words} />
            ) : null,
        },
        {
            id: 'top-words',
            title: 'Top words',
            content: data ? (
                <TopWordsOrPhrases
                    dashboard={dashboard}
                    id="top-words"
                    words={data.top_words_and_phrases.top_words}
                    filter1Description={data.filter_1_description}
                    filter2Description={data.filter_2_description}
                    yAxisWidth={125}
                />
            ) : null,
        },
        {
            id: 'two-word-phrases',
            title: 'Two word phases',
            content: data ? (
                <TopWordsOrPhrases
                    dashboard={dashboard}
                    id="two-word-phrases"
                    words={data.top_words_and_phrases.two_word_phrases}
                    filter1Description={data.filter_1_description}
                    filter2Description={data.filter_2_description}
                    yAxisWidth={175}
                />
            ) : null,
        },
        {
            id: 'three-word-phrases',
            title: 'Three word phases',
            content: data ? (
                <TopWordsOrPhrases
                    dashboard={dashboard}
                    id="three-word-phrases"
                    words={data.top_words_and_phrases.three_word_phrases}
                    filter1Description={data.filter_1_description}
                    filter2Description={data.filter_2_description}
                    yAxisWidth={225}
                />
            ) : null,
        },
    ]

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Top words and phrases" />
            <p>{"Here's what people said in their own words:"}</p>

            {/* Loading (only at first data fetch) */}
            {!data && !isError && <Loading dashboard={dashboard} />}

            {/* Graph */}
            {data && (
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
