'use client'

import { ParentSize } from '@visx/responsive'
import { Text } from '@visx/text'
import React, { useMemo } from 'react'
import { scaleLog } from '@visx/scale'
import { DashboardName } from '@enums'
import { Wordcloud } from '@visx/wordcloud'
import { useTooltip, useTooltipInPortal } from '@visx/tooltip'
import { IWordcloudWord } from '@interfaces'
import { toThousandsSep } from '@utils'
import { useFilterFormsStore } from '@stores/filter-forms'
import { TDashboard } from '@types'

interface IWordcloudProps {
    dashboard: TDashboard
    lang: string
    wordcloudWords: IWordcloudWord[]
}

interface ITooltipData {
    text: string
    count: number
}

export const TopWordsWordcloud = ({ dashboard, lang, wordcloudWords }: IWordcloudProps) => {
    const form1 = useFilterFormsStore((state) => state.form1)
    const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<ITooltipData>()
    const { containerBounds, TooltipInPortal } = useTooltipInPortal({
        scroll: true,
        detectBounds: true,
    })

    // Cache the wordcloud
    const cachedWordcloud = useMemo(() => {
        // Function to get font size
        const fontScale = scaleLog({
            domain: [
                Math.min(...wordcloudWords.map((w) => w.count_1)),
                Math.max(...wordcloudWords.map((w) => w.count_1)),
            ],
            range: [10, 150],
        })

        // Set wordcloud colors
        let wordcloudColors: string[]
        switch (dashboard) {
            case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
                wordcloudColors = [
                    'var(--pmnchPrimary)',
                    'var(--pmnchSecondary)',
                    'var(--pmnchTertiary)',
                    'var(--pmnchSenary)',
                    'var(--pmnchSeptenary)',
                ]
                break
            default:
                wordcloudColors = ['var(--defaultPrimary)', 'var(--defaultSecondary)', 'var(--defaultTertiary)']
        }

        // On wordcloud mouse over
        function handleMouseOver(event: React.MouseEvent<SVGTextElement, MouseEvent>, word: IWordcloudWord) {
            const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left
            const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top

            // Set tooltip data and display it
            showTooltip({
                tooltipLeft: containerX,
                tooltipTop: containerY,
                tooltipData: { text: word.text, count: word.count_1 },
            })
        }

        // On word click
        function handleOnClick(word: any) {
            if (form1) {
                form1.setValue('keyword_filter', word.text)
            }
        }

        return (
            <ParentSize className="bg-white">
                {(parent) => (
                    <Wordcloud
                        height={parent.height}
                        width={parent.width}
                        words={wordcloudWords}
                        fontSize={(datum) => fontScale(datum.count_1)}
                        spiral="rectangular"
                        rotate={0}
                        padding={3}
                        font={'Impact'}
                    >
                        {(cloudWords) =>
                            cloudWords.map((w: any, i) => (
                                <Text
                                    className="hover:cursor-pointer"
                                    key={`${w.text}-${i}`}
                                    fill={wordcloudColors[i % wordcloudColors.length]}
                                    textAnchor={'middle'}
                                    transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                                    fontSize={w.size}
                                    fontFamily={w.font}
                                    onMouseEnter={(e) => handleMouseOver(e, w)}
                                    onMouseLeave={hideTooltip}
                                    onClick={() => handleOnClick(w)}
                                >
                                    {w.text}
                                </Text>
                            ))
                        }
                    </Wordcloud>
                )}
            </ParentSize>
        )
    }, [dashboard, form1, wordcloudWords, hideTooltip, showTooltip, containerBounds])

    return (
        <div className="mb-3 h-[40rem]">
            {/* Wordcloud */}
            {cachedWordcloud}

            {/* Tooltip */}
            {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
                <TooltipInPortal key={Math.random()} top={tooltipTop} left={tooltipLeft}>
                    <div className="text-base">
                        {tooltipData.text}&nbsp;&nbsp;&nbsp;<strong>{toThousandsSep(tooltipData.count, lang)}</strong>
                    </div>
                </TooltipInPortal>
            )}
        </div>
    )
}
