import React from 'react'

interface ILoadingProps {
    dashboard: string
}

export const Error = ({ dashboard }: ILoadingProps) => {
    return (
        <div className="mt-5 flex items-center justify-center">
            <div className="ml-2">Error loading data</div>
        </div>
    )
}
