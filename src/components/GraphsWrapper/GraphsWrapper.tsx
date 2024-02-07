/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

'use client'

import { LegacyDashboardName } from '@enums'
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
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
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
        case LegacyDashboardName.HEALTHWELLBEING:
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
        case LegacyDashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            return (
                <>
                    <ResponsesBreakdownGraphs />
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                    <WorldBubbleMap />
                    <HistogramGraph />
                </>
            )
        case LegacyDashboardName.MIDWIVES_VOICES:
            return (
                <>
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                    <WorldBubbleMap />
                    <ResponsesBreakdownGraphs />
                    <LivingSettingsBreakdownGraph />
                    <HistogramGraph />
                </>
            )
        case LegacyDashboardName.WORLD_WE_WANT_DATA_EXCHANGE:
            return (
                <>
                    <ResponsesBreakdownGraphs />
                    <TopWordsAndPhrasesGraph />
                    <ResponsesSampleTable />
                    <WorldBubbleMap />
                    <GenderBreakdownGraph />
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
                    <GenderBreakdownGraph />
                    <LivingSettingsBreakdownGraph />
                    <HistogramGraph />
                </>
            )
    }
}
