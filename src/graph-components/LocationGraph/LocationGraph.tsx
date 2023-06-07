'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { useCampaignQuery } from '@hooks/use-campaign'
import { GraphError } from '@components/GraphError'
import { GraphLoading } from '@components/GraphLoading'
import React from 'react'

interface ILocationGraphProps {
    dashboard: string
}

export const LocationGraph = ({ dashboard }: ILocationGraphProps) => {
    // TODO: Make sure countries with few responses are not hidden in the map due countries with a lot of responses

    const { data, isError } = useCampaignQuery(dashboard)

    // Display graph or not
    const displayGraph = !!data

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Where are the [RESPONDENTS] located?" />
            <p></p>

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!displayGraph && !isError && <GraphLoading dashboard={dashboard} />}

            {/* Graph */}
            {displayGraph && <div>123</div>}
        </Box>
    )
}
