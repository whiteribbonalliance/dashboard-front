'use client'

import { DashboardName } from '@enums'
import { ResponsesBreakdownGraphs } from 'graph-components/ResponsesBreakdownGraphs'
import { WorldBubbleMap } from '@graph-components/WorldBubbleMap'
import { HistogramGraph } from 'graph-components/HistogramGraph'
import { GenderBreakdownGraph } from '@graph-components/GenderBreakdownGraph'
import { TopWordsAndPhrasesGraph } from '@graph-components/TopWordsAndPhrasesGraph'
import { ResponsesSampleTable } from '@graph-components/ResponsesSampleTable'
import { LivingSettingsBreakdownGraph } from '@graph-components/LivingSettingsBreakdownGraph'
import React, { useContext } from 'react'
import { ParamsContext } from '@contexts/params'

export const GraphsWrapper = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard } = params

    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return (
                <>
                    <ResponsesBreakdownGraphs />
                    <WorldBubbleMap />
                    <HistogramGraph />
                    <GenderBreakdownGraph />
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                </>
            )
        case DashboardName.HEALTHWELLBEING:
            return (
                <>
                    <ResponsesBreakdownGraphs />
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                    <WorldBubbleMap />
                    <GenderBreakdownGraph />
                    <LivingSettingsBreakdownGraph />
                    <HistogramGraph />
                </>
            )
        case DashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            return (
                <>
                    <ResponsesBreakdownGraphs />
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                    <WorldBubbleMap />
                    <HistogramGraph />
                </>
            )
        default:
            return (
                <>
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                    <WorldBubbleMap />
                    <ResponsesBreakdownGraphs />
                    <HistogramGraph />
                </>
            )
    }
}
