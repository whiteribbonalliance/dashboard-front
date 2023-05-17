import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface IGenderBreakdownGraphProps {
    dashboard: string
}

export const GenderBreakdownGraph = ({ dashboard }: IGenderBreakdownGraphProps) => {
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Gender breakdown" />
            <div>123</div>
        </Box>
    )
}
