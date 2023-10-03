'use client'

import { TDashboard } from '@types'
import { DashboardName } from '@enums'
import { ResponsesBreakdownGraphs } from 'graph-components/ResponsesBreakdownGraphs'
import { WorldBubbleMap } from '@graph-components/WorldBubbleMap'
import { HistogramGraph } from 'graph-components/HistogramGraph'
import { GenderBreakdownGraph } from '@graph-components/GenderBreakdownGraph'
import { TopWordsAndPhrasesGraph } from '@graph-components/TopWordsAndPhrasesGraph'
import { ResponsesSampleTable } from '@graph-components/ResponsesSampleTable'
import { LivingSettingsBreakdownGraph } from '@graph-components/LivingSettingsBreakdownGraph'
import React from 'react'

interface IGraphsProps {
    dashboard: TDashboard
    lang: string
}

export const Graphs = ({ dashboard, lang }: IGraphsProps) => {
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return (
                <>
                    <ResponsesBreakdownGraphs dashboard={dashboard} lang={lang} />
                    <WorldBubbleMap dashboard={dashboard} lang={lang} />
                    <HistogramGraph dashboard={dashboard} lang={lang} />
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
                    <GenderBreakdownGraph dashboard={dashboard} lang={lang} />
                    <ResponsesBreakdownGraphs dashboard={dashboard} lang={lang} />
                    <LivingSettingsBreakdownGraph dashboard={dashboard} lang={lang} />
                    <HistogramGraph dashboard={dashboard} lang={lang} />
                </>
            )
        default:
            return (
                <>
                    <TopWordsAndPhrasesGraph dashboard={dashboard} lang={lang} />
                    <ResponsesSampleTable dashboard={dashboard} lang={lang} />
                    <WorldBubbleMap dashboard={dashboard} lang={lang} />
                    <ResponsesBreakdownGraphs dashboard={dashboard} lang={lang} />
                    <HistogramGraph dashboard={dashboard} lang={lang} />
                </>
            )
    }
}
