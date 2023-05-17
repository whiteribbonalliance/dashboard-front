import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface IResponsesBreakdownGraphProps {
    dashboard: string
}

export const ResponsesBreakdownGraph = ({ dashboard }: IResponsesBreakdownGraphProps) => {
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Breakdown of women's responses by topic" />
            <div>123</div>
        </Box>
    )
}
