'use client'

import { useContext } from 'react'
import { ParamsContext } from '@contexts/params'

interface ITitleProps {
    noHeading?: boolean
}

export const Title = ({ noHeading = false }: ITitleProps) => {
    const { params } = useContext(ParamsContext)
    const { config } = params

    // When using the title at multiple places, use noHeading to prevent multiple h1 tags
    return (
        <>
            {noHeading ? (
                <div className="font-proxima-nova mx-2 text-center text-4xl font-bold">{config.campaign_title}</div>
            ) : (
                <h1 className="font-proxima-nova mx-2 text-center text-4xl font-bold">{config.campaign_title}</h1>
            )}
        </>
    )
}
