'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { DashboardName } from '@enums'
import { useCampaignQuery } from '@hooks/use-campaign'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { classNames, toThousandsSep } from '@utils'
import { GraphLoading } from 'components/GraphLoading'
import { GraphError } from 'components/GraphError'
import { useTranslation } from '@app/i18n/client'
import { IFilterFormsState, useFilterFormsStore } from '@stores/filter-forms'

interface IResponsesBreakdownGraphProps {
    dashboard: string
    lang: string
}

interface ICustomTooltip extends TooltipProps<ValueType, NameType> {
    dashboard: string
    lang: string
}

export const ResponsesBreakdownGraph = ({ dashboard, lang }: IResponsesBreakdownGraphProps) => {
    const { data, isError } = useCampaignQuery(dashboard, lang)
    const form1 = useFilterFormsStore((state: IFilterFormsState) => state.form1)
    const { t } = useTranslation(lang)

    // Set topic text
    let topicText: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            topicText = 'domain'
            break
        default:
            topicText = 'topic'
    }

    // Set respondents text
    let respondentsText: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            respondentsText = "women's"
            break
        default:
            respondentsText = "respondents'"
    }

    // Set click view topic responses translation
    let clickViewTopicResponsesTranslation: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            clickViewTopicResponsesTranslation = t('www-click-view-topic-responses')
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            clickViewTopicResponsesTranslation = t('pmnch-click-view-topic-responses')
            break
        case DashboardName.MIDWIVES_VOICES:
            clickViewTopicResponsesTranslation = t('midwives-voices-click-view-topic-responses')
            break
        default:
            clickViewTopicResponsesTranslation = ''
    }

    // Set bar classes
    let barClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            barClasses = 'fill-pmnchColors-secondary hover:fill-pmnchColors-secondaryFaint'
            break
        default:
            barClasses = 'fill-defaultColors-secondary hover:fill-defaultColors-secondaryFaint'
    }

    // Set breakdown responses topic translation
    let breakdownResponsesTopicTranslation: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            breakdownResponsesTopicTranslation = t('breakdown-women-responses-topic')
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            breakdownResponsesTopicTranslation = t('breakdown-respondents-domain')
            break
        case DashboardName.MIDWIVES_VOICES:
            breakdownResponsesTopicTranslation = t('breakdown-respondents-topic')
            break
        default:
            breakdownResponsesTopicTranslation = t('breakdown-respondents-topic')
    }

    // Format x-axis numbers
    function xAxisFormatter(item: number) {
        return toThousandsSep(item, lang).toString()
    }

    // Set response topic
    function setResponseTopic(payload: any) {
        if (form1) {
            console.log(payload)
            form1.setValue('response_topics', [payload.code])
        }
    }

    // Display graph or not
    const displayGraph = !!data

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={breakdownResponsesTopicTranslation} />
            <p>{clickViewTopicResponsesTranslation}</p>

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!displayGraph && !isError && <GraphLoading dashboard={dashboard} />}

            {/* Graph */}
            {displayGraph && (
                <>
                    {/* Bar chart */}
                    <div className="mb-3 mt-3 w-full">
                        <ResponsiveContainer height={400} className="bg-white">
                            <BarChart
                                data={data.responses_breakdown}
                                margin={{ top: 15, right: 50, left: 10, bottom: 15 }}
                                width={750}
                                height={500}
                                layout="vertical"
                                barCategoryGap={5}
                            >
                                <XAxis
                                    dataKey="count"
                                    type="number"
                                    axisLine={false}
                                    tickCount={7}
                                    tickFormatter={(item) => xAxisFormatter(item)}
                                />
                                <YAxis
                                    dataKey="description"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    width={450}
                                    interval={0}
                                />
                                <CartesianGrid strokeDasharray="0" stroke="#FFFFFF" />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={<CustomTooltip dashboard={dashboard} lang={lang} />}
                                    position={{ x: 25 }}
                                />
                                <Bar
                                    dataKey="count"
                                    className={classNames('hover:cursor-pointer', barClasses)}
                                    minPointSize={5}
                                    onClick={setResponseTopic}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </Box>
    )
}

const CustomTooltip = ({ active, payload, label, dashboard, lang }: ICustomTooltip) => {
    if (active && payload && payload.length) {
        const value = payload[0].value as number

        // Set p classes
        let pClasses: string
        switch (dashboard) {
            case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
                pClasses = 'bg-pmnchColors-secondary'
                break
            default:
                pClasses = 'bg-defaultColors-secondary'
        }

        return (
            <p className={classNames(`border border-white p-1 text-sm text-white`, pClasses)}>
                <span className="font-bold">{toThousandsSep(value, lang)}</span> people mentioned{' '}
                <span className="font-bold">“{label}”</span>.
            </p>
        )
    }

    return null
}
