/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

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

'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { LegacyDashboardName } from '@enums'
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Chevron } from '@components/Chevron'
import { useCampaignQuery } from '@hooks/use-campaign-query'
import { classNames } from '@utils'
import { Loading } from 'components/Loading'
import { GraphError } from 'components/GraphError'
import { useTranslation } from '@app/i18n/client'
import { Tooltip } from '@components/Tooltip'
import { IResponsesSample } from '@interfaces'
import { ParamsContext } from '@contexts/params'
import { ConfigurationContext } from '@contexts/configuration'

interface IDescriptionCountAndColor {
    description: string
    count: number
    color: string
}

interface ITableData {
    data: any[]
    columns: ColumnDef<any, any>[]
}

const columnHelper = createColumnHelper<any>()

export const ResponsesSampleTable = () => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const [tableData, setTableData] = useState<ITableData>({ data: [], columns: [] })
    const { data, isError, isLoading, isRefetching } = useCampaignQuery()
    const [responsesSample, setResponsesSample] = useState<IResponsesSample>(undefined as any)
    const { t } = useTranslation(lang)
    const { currentCampaignConfiguration } = useContext(ConfigurationContext)

    // An array with objects containing the description, count, and the color assigned to it
    const [descriptionsCountAndColor, setDescriptionsCountAndColor] = useState<IDescriptionCountAndColor[]>([])

    // Set table data
    useEffect(() => {
        if (responsesSample) {
            const tmpColumns: ColumnDef<any, any>[] = []
            for (const column of responsesSample.columns) {
                tmpColumns.push(
                    columnHelper.accessor(column.id, {
                        header: column.name,
                    })
                )
            }
            setTableData({ data: responsesSample.data, columns: tmpColumns })
        }
    }, [responsesSample])

    // Set responses sample
    useEffect(() => {
        if (data) {
            setResponsesSample(data.responses_sample)
        }
    }, [data])

    // Table
    const table = useReactTable({
        data: tableData.data,
        columns: tableData.columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    // Set page size
    useEffect(() => {
        table.setPageSize(10)
    }, [table])

    // Set question asked
    let questionAsked: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_WOMEN_WANT:
            questionAsked = t(`${currentCampaignConfiguration.campaign_code}-question-asked`)
            break
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            questionAsked = t(`${currentCampaignConfiguration.campaign_code}-question-asked`)
            break
        case LegacyDashboardName.MIDWIVES_VOICES:
            questionAsked = t(`${currentCampaignConfiguration.campaign_code}-question-asked`)
            break
        default:
            questionAsked = ''
    }

    // Set th classes
    let thClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            thClasses = 'font-bold'
            break
        default:
            thClasses = 'font-normal'
    }

    // Set descriptions count and color
    useEffect(() => {
        if (tableData.data) {
            // Get all unique descriptions and the count
            let tmpDescriptionsCountAndColor: IDescriptionCountAndColor[] = []
            tableData.data.forEach((datum) => {
                const description = datum.description
                const objExists = tmpDescriptionsCountAndColor.some((obj) => obj.description === description)
                if (!objExists) {
                    tmpDescriptionsCountAndColor.push({ description: description, count: 0, color: '' })
                }
                const obj = tmpDescriptionsCountAndColor.find((obj) => obj.description === description)
                if (obj) {
                    obj['count'] += 1
                }
            })

            // Sort from highest to lowest
            tmpDescriptionsCountAndColor = tmpDescriptionsCountAndColor.sort((a, b) => a.count - b.count).reverse()

            // Set the colors list
            let colors: string[]
            switch (dashboard) {
                case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
                    colors = [
                        'bg-pmnchColors-primaryFaint',
                        'bg-pmnchColors-secondaryFaint',
                        'bg-pmnchColors-tertiaryFaint',
                        'bg-pmnchColors-quaternaryFaint',
                        'bg-pmnchColors-quinaryFaint',
                    ]
                    break
                default:
                    colors = [
                        'bg-defaultColors-primaryFaint',
                        'bg-defaultColors-secondaryFaint',
                        'bg-defaultColors-tertiaryFaint',
                        'bg-defaultColors-quaternaryFaint',
                        'bg-defaultColors-quinaryFaint',
                    ]
            }

            // Set color for each description
            for (let i = 0; i < tmpDescriptionsCountAndColor.length; i++) {
                tmpDescriptionsCountAndColor[i]['color'] = colors[i % colors.length]
            }
            setDescriptionsCountAndColor(tmpDescriptionsCountAndColor)
        }
    }, [dashboard, tableData])

    // Get the description's color class
    const getDescriptionColorClass = useCallback(
        (row: Row<any>) => {
            // Find the cell with column_id response
            const cell = row.getAllCells().find((obj) => obj.column.id === 'response')

            // Get color class
            if (cell) {
                const description: string = cell.row.original?.description
                if (description) {
                    const descriptionCountAndColor = descriptionsCountAndColor.find(
                        (obj) => obj.description === description
                    )
                    if (descriptionCountAndColor) {
                        return descriptionCountAndColor.color
                    }
                }
            }

            return ''
        },
        [descriptionsCountAndColor]
    )

    const displayTable = !!data && !isLoading && !isRefetching

    return (
        <div>
            {/* Tooltip: sample responses */}
            <Tooltip
                id="sample-responses"
                dashboard={dashboard}
                title={'Sample responses'}
                paragraphs={[
                    'Look here to see a randomized sample of the original responses, in the actual words of the respondents who shared their responses for the campaign.',
                    'You can also see which category each response was assigned to, which country the respondent lives in, and their age.',
                ]}
            />

            <Box>
                <div data-tooltip-id="sample-responses">
                    <GraphTitle dashboard={dashboard} text={t('a-sample-1000-responses')} />
                </div>
                <p>
                    <span className="italic">{questionAsked}</span>
                </p>

                {/* Error */}
                {!data && isError && <GraphError dashboard={dashboard} />}

                {/* Loading */}
                {!displayTable && !isError && <Loading dashboard={dashboard} />}

                {/* Table */}
                {displayTable && (
                    <>
                        <table className="mb-3 mt-3 w-full table-fixed bg-white">
                            <thead className="border-b-grayLight border-b">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className={classNames(
                                                    'border-r-grayLight border-r px-1 text-left',
                                                    header.id === 'response' ? 'w-[100%]' : 'w-[35%]',
                                                    thClasses
                                                )}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-b-grayLight border-b">
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className={classNames(
                                                    'border-r-grayLight break-words border-r px-1',
                                                    cell.column.id === 'response' ? getDescriptionColorClass(row) : ''
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-end">
                            <div className="flex items-center gap-x-3">
                                {/* Go to first page */}
                                <div className="text-sm" onClick={() => table.setPageIndex(0)}>
                                    <Chevron double={true} direction="left" />
                                </div>

                                {/* Go to previous page */}
                                <div className="text-sm" onClick={() => table.previousPage()}>
                                    <Chevron direction="left" />
                                </div>

                                {/* Current page index */}
                                <input
                                    className="flex h-7 w-[3em] items-center rounded-sm p-0.5 text-center"
                                    type="number"
                                    min={1}
                                    max={table.getPageCount()}
                                    value={table.getState().pagination.pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        table.setPageIndex(page)
                                    }}
                                />

                                <span>/</span>

                                {/* Total pages */}
                                <span>{table.getPageCount()}</span>

                                {/* Go to next page */}
                                <div
                                    className="text-sm"
                                    onClick={() => {
                                        if (table.getState().pagination.pageIndex + 1 !== table.getPageCount()) {
                                            table.nextPage()
                                        }
                                    }}
                                >
                                    <Chevron direction="right" />
                                </div>

                                {/* Go to last page */}
                                <div className="text-sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                                    <Chevron double={true} direction="right" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Box>
        </div>
    )
}
