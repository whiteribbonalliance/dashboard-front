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

import { useTranslation } from '@app/i18n'
import { classNames } from '@utils'
import { LegacyDashboardName } from '@enums'
import Link from 'next/link'
import React from 'react'

const HtmlToReact = require('html-to-react')
const HtmlToReactParser = require('html-to-react').Parser

interface ISubtextProps {
    subtext: string
    dashboard: string
    lang: string
    campaignCode: string
}

export const Subtext = async ({ subtext, dashboard, lang, campaignCode }: ISubtextProps) => {
    const { t } = await useTranslation(lang)

    // Set link classes
    let linkClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            linkClasses = 'text-pmnchColors-secondary'
            break
        default:
            linkClasses = 'text-defaultColors-secondary'
    }

    // Set subtext element
    let subtextElement: JSX.Element
    switch (dashboard) {
        case LegacyDashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
            subtextElement = (
                <>
                    <p className="mb-3">{t(`${campaignCode}-asked-questions`)}:</p>
                    <p className="mb-3">
                        “¿Qué es lo que más deseas o necesitas para encontrar empleo o un mejor empleo? Por favor,
                        comparte sólo la petición más importante para ti.“ ({t(`${dashboard}-q1`)})
                    </p>
                    <p>
                        “¿Qué debería hacer el gobierno para ayudarte a conseguir el trabajo de tus sueños? Por favor,
                        comparte sólo la petición más importante para ti.“ ({t(`${dashboard}-q2`)})
                    </p>
                </>
            )
            break
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            // Set the link inside an anchor tag
            subtext = subtext.replace(
                'http://www.1point8.org',
                '<a href="http://www.1point8.org">http://www.1point8.org</a>'
            )

            // Processing instructions for the parser
            const processingInstructions = [
                {
                    shouldProcessNode: (node: any) => node.name === 'a',
                    processNode: (node: any, children: any, index: number) => {
                        return (
                            <Link
                                key={index}
                                href={node.attribs.href}
                                className={classNames('underline', linkClasses)}
                                target="_blank"
                            >
                                {children[0]}
                            </Link>
                        )
                    },
                },
                {
                    shouldProcessNode: () => true,
                    processNode: new HtmlToReact.ProcessNodeDefinitions().processDefaultNode,
                },
            ]

            // Parse
            subtextElement = (
                <div>{new HtmlToReactParser().parseWithInstructions(subtext, () => true, processingInstructions)}</div>
            )
            break
        default:
            subtextElement = (
                <>
                    {subtext.split('\n').map((e, i) => (
                        <span className="mb-1" key={i}>
                            {e}
                        </span>
                    ))}
                </>
            )
    }

    return <h2 className="flex max-w-6xl flex-col text-center text-lg">{subtextElement}</h2>
}
