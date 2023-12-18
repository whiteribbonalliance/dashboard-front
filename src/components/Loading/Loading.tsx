import { Spinner } from '@components/Spinner'
import React from 'react'

interface ILoadingProps {
    dashboard: string
}

export const Loading = ({ dashboard }: ILoadingProps) => {
    return (
        <div className="flex items-center justify-center">
            <Spinner dashboard={dashboard} />
            <div className="ml-2">Loading...</div>
        </div>
    )
}
