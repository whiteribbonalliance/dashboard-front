/*
MIT License

Copyright (c) 2023 World We Want. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import { Tooltip as ReactTooltip } from 'react-tooltip'
import React from 'react'

interface ITooltip {
    dashboard: string
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
