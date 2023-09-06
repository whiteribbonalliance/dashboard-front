import { Spinner } from '@components/Spinner'
import React from 'react'
import { TDashboard } from '@types'

interface ILoadingProps {
    dashboard: TDashboard
}

export const Loading = ({ dashboard }: ILoadingProps) => {
    return (
        <div className="flex items-center justify-center">
            <Spinner dashboard={dashboard} />
            <div className="ml-2">Loading...</div>
        </div>
    )
}
