import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { Dashboards } from '@enums'

interface IResponsesBreakdownGraphProps {
    dashboard: string
}

export const ResponsesBreakdownGraph = ({ dashboard }: IResponsesBreakdownGraphProps) => {
    // Set topic text
    let topicText: string
    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            topicText = 'domain'
            break
        default:
            topicText = 'topic'
    }

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={`Breakdown of women's responses by ${topicText}`} />
            <div>123</div>
        </Box>
    )
}
