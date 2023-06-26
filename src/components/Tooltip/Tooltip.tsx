import { Tooltip as ReactTooltip } from 'react-tooltip'
import React from 'react'
import { Dashboard } from '@types'

interface ITooltip {
    dashboard: Dashboard
    id: string
    title: string
    paragraphs: string[]
}

export const Tooltip = ({ dashboard, id, title, paragraphs }: ITooltip) => {
    // Set background color
    let backgroundColor: string
    switch (dashboard) {
        default:
            backgroundColor = 'var(--defaultPrimary)'
    }

    return (
        <ReactTooltip id={id} place="top" variant="info" style={{ backgroundColor, maxWidth: '40rem', zIndex: 9999 }}>
            <p className="text-lg font-bold">{title}</p>
            <div className="flex flex-col gap-y-2">
                {paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                ))}
            </div>
        </ReactTooltip>
    )
}
