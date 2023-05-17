import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'

interface ITopWordsAndPhrasesGraphProps {
    dashboard: string
}

export const TopWordsAndPhrasesGraph = ({ dashboard }: ITopWordsAndPhrasesGraphProps) => {
    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="Top words and phrases" />
            <div>123</div>
        </Box>
    )
}
