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

    // Set respondents text
    let respondentsText: string
    switch (dashboard) {
        case Dashboards.WHAT_WOMEN_WANT:
            respondentsText = "women's"
            break
        default:
            respondentsText = "respondents'"
    }

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text={`Breakdown of ${respondentsText} responses by ${topicText}`} />
            <div>123</div>
        </Box>
    )
}
