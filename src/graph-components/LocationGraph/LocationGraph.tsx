import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface ILocationGraphProps {
    dashboard: string
}

export const LocationGraph = ({ dashboard }: ILocationGraphProps) => {
    // TODO: Make sure countries with few responses are not hidden in the map due countries with a lot of responses
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Where are the women located?" />
            <div>123</div>
        </Box>
    )
}
