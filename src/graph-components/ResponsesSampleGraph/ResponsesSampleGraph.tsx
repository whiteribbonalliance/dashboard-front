'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { DashboardName } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import React, { useCallback, useEffect, useState } from 'react'
import { Chevron } from '@components/Chevron'
import { useCampaignQuery } from '@hooks/use-campaign'
import { classNames } from '@utils'
import { GraphLoading } from 'components/GraphLoading'
import { GraphError } from 'components/GraphError'

interface IResponsesSampleGraphProps {
    dashboard: string
}

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

export const ResponsesSampleGraph = ({ dashboard }: IResponsesSampleGraphProps) => {
    const [tableData, setTableData] = useState<ITableData>({ data: [], columns: [] })
    const { data, isError } = useCampaignQuery(dashboard)

    // An array with objects containing the description, count, and the color assigned to it
    const [descriptionsCountAndColor, setDescriptionsCountAndColor] = useState<IDescriptionCountAndColor[]>([])

    // Set table data
    useEffect(() => {
        if (data) {
            const tmpColumns: ColumnDef<any, any>[] = []
            for (const column of data.responses_sample.columns) {
                tmpColumns.push(
                    columnHelper.accessor(column.id, {
                        header: column.name,
                    })
                )
            }
            setTableData({ data: data.responses_sample.data, columns: tmpColumns })
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
        case DashboardName.WHAT_WOMEN_WANT:
            questionAsked = whatWomenWantConfig.questionAsked
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            questionAsked = whatYoungPeopleWantConfig.questionAsked
            break
        case DashboardName.MIDWIVES_VOICES:
            questionAsked = midwivesVoicesConfig.questionAsked
            break
        default:
            questionAsked = ''
    }

    // Set th classes
    let thClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
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
                case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
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
            // Find the cell with column_id raw_response
            const cell = row.getAllCells().find((obj) => obj.column.id === 'raw_response')

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

    // Display table or not
    const displayTable = !!data

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="A sample of 1000 responses" />
            <p>
                Question asked: <span className="italic">{questionAsked}</span>
            </p>

            {/* Error */}
            {!data && isError && <GraphError dashboard={dashboard} />}

            {/* Loading (only at first data fetch) */}
            {!displayTable && !isError && <GraphLoading dashboard={dashboard} />}

            {/* Table */}
            {displayTable && (
                <>
                    <table className="mb-3 mt-3 w-full bg-white">
                        <thead className="border-b border-b-grayLight">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={classNames(
                                                'border-r border-r-grayLight px-1 text-left',
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
                                <tr key={row.id} className="border-b border-b-grayLight">
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className={classNames(
                                                'border-r border-r-grayLight px-1',
                                                cell.column.id === 'raw_response' ? getDescriptionColorClass(row) : ''
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
    )
}
