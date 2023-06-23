import React from 'react'
import { Dashboard } from '@types'

interface IGraphErrorProps {
    dashboard: Dashboard
}

export const GraphError = ({ dashboard }: IGraphErrorProps) => {
    return (
        <div className="mt-5 flex items-center justify-center">
            <div className="ml-2">Error loading data</div>
        </div>
    )
}
