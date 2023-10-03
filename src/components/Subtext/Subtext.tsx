'use client'

import { TDashboard } from '@types'
import { useTranslation } from '@app/i18n/client'
import { applyToThousandsSepOnText, classNames, getDashboardConfig } from '@utils'
import { DashboardName } from '@enums'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const HtmlToReact = require('html-to-react')
const HtmlToReactParser = require('html-to-react').Parser

interface ISubtextProps {
    dashboard: TDashboard
    lang: string
}

export const Subtext = ({ dashboard, lang }: ISubtextProps) => {
    const { t } = useTranslation(lang)
    const config = getDashboardConfig(dashboard)
    const [subtextElement, setSubtextElement] = useState<React.JSX.Element>()

    // Set link classes
    let linkClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            linkClasses = 'text-pmnchColors-secondary'
            break
        default:
            linkClasses = 'text-defaultColors-secondary'
    }

    // Set subtext element
    useEffect(() => {
        switch (dashboard) {
            case DashboardName.ECONOMIC_EMPOWERMENT_MEXICO:
                setSubtextElement(
                    <>
                        <p className="mb-3">{applyToThousandsSepOnText(t('giz-asked-questions'), lang)}:</p>
                        <p className="mb-3">
                            “¿Qué es lo que más deseas o necesitas para encontrar empleo o un mejor empleo? Por favor,
                            comparte sólo la petición más importante para ti.“ ({t(`${dashboard}-q1`)})
                        </p>
                        <p>
                            “¿Qué debería hacer el gobierno para ayudarte a conseguir el trabajo de tus sueños? Por
                            favor, comparte sólo la petición más importante para ti.“ ({t(`${dashboard}-q2`)})
                        </p>
                    </>
                )
                break
            case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
                let subtext = applyToThousandsSepOnText(t(`${config.campaignCode}-subtext`), lang)

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
                setSubtextElement(
                    new HtmlToReactParser().parseWithInstructions(subtext, () => true, processingInstructions)
                )
                break
            case DashboardName.WOMENS_ECONOMIC_EMPOWERMENT:
                setSubtextElement(<></>)
                break
            case DashboardName.ALL_CAMPAIGNS:
                setSubtextElement(<></>)
                break
            default:
                setSubtextElement(<p>{applyToThousandsSepOnText(t(`${config.campaignCode}-subtext`), lang)}</p>)
        }
    }, [dashboard, lang, t, config, linkClasses])

    return <div className="max-w-6xl text-center text-lg">{subtextElement && subtextElement}</div>
}
