import React from 'react'

interface IGraphErrorProps {
    dashboard: string
}

export const GraphError = ({ dashboard }: IGraphErrorProps) => {
    return (
        <div className="mt-5 flex items-center justify-center">
            <div className="ml-2">Error loading data</div>
        </div>
    )
}
