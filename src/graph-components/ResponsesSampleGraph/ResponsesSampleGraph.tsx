import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface IResponsesSampleGraphProps {
    dashboard: string
}

export const ResponsesSampleGraph = ({ dashboard }: IResponsesSampleGraphProps) => {
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="A sample of 1000 responses" />
            <div>123</div>
        </Box>
    )
}
