'use client'

import { TDashboard } from '@types'
import { DashboardName } from '@enums'
import { ResponsesBreakdownGraph } from '@graph-components/ResponsesBreakdownGraph'
import { WorldBubbleMap } from '@graph-components/WorldBubbleMap'
import { WhoThePeopleAreGraph } from '@graph-components/WhoThePeopleAreGraph'
import { GenderBreakdownGraph } from '@graph-components/GenderBreakdownGraph'
import { TopWordsAndPhrasesGraph } from '@graph-components/TopWordsAndPhrasesGraph'
import { ResponsesSampleTable } from '@graph-components/ResponsesSampleTable'
import { LivingSettingsBreakdownGraph } from '@graph-components/LivingSettingsBreakdownGraph'
import React from 'react'
import { useQuestionAskedCodeStore } from '@stores/question-asked-code'

interface IGraphsProps {
    dashboard: TDashboard
    lang: string
}

export const Graphs = ({ dashboard, lang }: IGraphsProps) => {
    const questionAskedCode = useQuestionAskedCodeStore((state) => state.questionAskedCode)

    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return (
                <>
                    <ResponsesBreakdownGraph dashboard={dashboard} lang={lang} />
                    <WorldBubbleMap dashboard={dashboard} lang={lang} />
                    <WhoThePeopleAreGraph dashboard={dashboard} lang={lang} />
                    <GenderBreakdownGraph dashboard={dashboard} lang={lang} />
                    <TopWordsAndPhrasesGraph dashboard={dashboard} lang={lang} />
                    <ResponsesSampleTable dashboard={dashboard} lang={lang} />
                </>
            )
        case DashboardName.HEALTHWELLBEING:
            return (
                <>
                    <TopWordsAndPhrasesGraph dashboard={dashboard} lang={lang} />
                    <ResponsesSampleTable dashboard={dashboard} lang={lang} />
                    <WorldBubbleMap dashboard={dashboard} lang={lang} />

                    {/* Hide graph if healthwellbeing and q2 */}
                    {questionAskedCode !== 'q2' && <ResponsesBreakdownGraph dashboard={dashboard} lang={lang} />}

                    <LivingSettingsBreakdownGraph dashboard={dashboard} lang={lang} />
                    <WhoThePeopleAreGraph dashboard={dashboard} lang={lang} />
                </>
            )
        default:
            return (
                <>
                    <TopWordsAndPhrasesGraph dashboard={dashboard} lang={lang} />
                    <ResponsesSampleTable dashboard={dashboard} lang={lang} />
                    <WorldBubbleMap dashboard={dashboard} lang={lang} />
                    <ResponsesBreakdownGraph dashboard={dashboard} lang={lang} />
                    <WhoThePeopleAreGraph dashboard={dashboard} lang={lang} />
                </>
            )
    }
}
