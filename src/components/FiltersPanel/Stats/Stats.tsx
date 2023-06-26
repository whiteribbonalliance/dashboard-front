'use client'

import { Box } from '@components/Box'
import { useCampaignQuery } from '@hooks/use-campaign'
import { useTranslation } from '@app/i18n/client'
import { toThousandsSep } from '@utils'
import { Dashboard } from '@types'
import { Tooltip } from '@components/Tooltip'
import React from 'react'

interface IStatsProps {
    dashboard: Dashboard
    lang: string
}

export const Stats = ({ dashboard, lang }: IStatsProps) => {
    const { data } = useCampaignQuery(dashboard, lang)
    const { t } = useTranslation(lang)

    if (!data) return null

    return (
        <div>
            {/* Tooltip: number of respondents */}
            <Tooltip
                id="stats-number-of-respondents"
                dashboard={dashboard}
                title={'Number of responses'}
                paragraphs={[
                    'Here you can see how many respondents fall into the criteria you have selected in the filters. If you have selected two groups or segments using the “Compare to...” tab in the filters control panel, then the number of respondents in the second group will appear in the box on the right.',
                ]}
            />

            {/* Tooltip: average age */}
            <Tooltip
                id="stats-average-age"
                dashboard={dashboard}
                title={'Average age'}
                paragraphs={[
                    'This shows the average age of the respondents you have selected.',
                    'If you have selected two groups or segments using the “Compare to...” tab in the filters control panel, then the average age of the second group will appear in the box on the right.',
                ]}
            />

            <div className="mb-5 flex flex-col">
                <div className="mb-2 flex w-full flex-row gap-x-3">
                    <div className="flex-1" data-tooltip-id="stats-number-of-respondents">
                        <Box>
                            <div className="text-2xl">{toThousandsSep(data.filter_1_respondents_count, lang)}</div>
                            <div>{data.filter_1_description}</div>
                        </Box>
                    </div>
                    <div className="flex-1" data-tooltip-id="stats-average-age">
                        <Box>
                            <div className="text-2xl">{data.filter_1_average_age}</div>
                            <div>{t('average-age')}</div>
                        </Box>
                    </div>
                </div>

                {/* Only display if filters are not identical */}
                {!data.filters_are_identical && (
                    <>
                        <div className="text-center">{t('vs')}</div>
                        <div className="mt-2 flex w-full flex-row gap-x-3">
                            <div className="flex-1">
                                <Box>
                                    <div className="text-2xl">
                                        {toThousandsSep(data.filter_2_respondents_count, lang)}
                                    </div>
                                    <div>{data.filter_2_description}</div>
                                </Box>
                            </div>
                            <div className="flex-1">
                                <Box>
                                    <div className="text-2xl">{data.filter_2_average_age}</div>
                                    <div>{t('average-age')}</div>
                                </Box>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
