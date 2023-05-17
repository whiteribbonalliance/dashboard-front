import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface ILocationGraphProps {
    dashboard: string
}

export const LocationGraph = ({ dashboard }: ILocationGraphProps) => {
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Where are the women located?" />
            <div>123</div>
        </Box>
    )
}
