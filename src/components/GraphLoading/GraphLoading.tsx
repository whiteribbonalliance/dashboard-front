import { Spinner } from '@components/Spinner'
import React from 'react'

interface IGraphLoadingProps {
    dashboard: string
}

export const GraphLoading = ({ dashboard }: IGraphLoadingProps) => {
    return (
        <div className="mt-5 flex items-center justify-center">
            <Spinner dashboard={dashboard} />
            <div className="ml-2">Loading...</div>
        </div>
    )
}
