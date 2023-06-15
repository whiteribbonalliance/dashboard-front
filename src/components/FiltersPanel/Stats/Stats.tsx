'use client'

import { Box } from '@components/Box'
import { useCampaignQuery } from '@hooks/use-campaign'

interface IStatsProps {
    dashboard: string
    lang: string
}

export const Stats = ({ dashboard, lang }: IStatsProps) => {
    const { data } = useCampaignQuery(dashboard, lang)

    if (!data) return null

    return (
        <div className="mb-5 flex flex-col">
            <div className="mb-2 flex w-full flex-row gap-x-3">
                <div className="flex-1">
                    <Box>
                        <div className="text-2xl">{data.filter_1_respondents_count}</div>
                        <div>{data.filter_1_description}</div>
                    </Box>
                </div>
                <div className="flex-1">
                    <Box>
                        <div className="text-2xl">{data.filter_1_average_age}</div>
                        <div>Average age</div>
                    </Box>
                </div>
            </div>

            {/* Only display if filters are not identical */}
            {!data.filters_are_identical && (
                <>
                    <div className="text-center">vs</div>
                    <div className="mt-2 flex w-full flex-row gap-x-3">
                        <div className="flex-1">
                            <Box>
                                <div className="text-2xl">{data.filter_2_respondents_count}</div>
                                <div>{data.filter_2_description}</div>
                            </Box>
                        </div>
                        <div className="flex-1">
                            <Box>
                                <div className="text-2xl">{data.filter_2_average_age}</div>
                                <div>Average age</div>
                            </Box>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
