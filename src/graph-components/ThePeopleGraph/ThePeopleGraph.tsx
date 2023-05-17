import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface IThePeopleGraphProps {
    dashboard: string
}

export const ThePeopleGraph = ({ dashboard }: IThePeopleGraphProps) => {
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Who the people are" />
            <div>123</div>
        </Box>
    )
}
