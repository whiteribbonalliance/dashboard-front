'use client'

import { Box } from '@components/Box'
import { GraphTitle } from '@components/GraphTitle'
import { DashboardName } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Chevron } from '@components/Chevron'

interface IResponsesSampleGraphProps {
    dashboard: string
}

const defaultData: any = []
for (let i = 0; i < 100; i++) {
    defaultData.push({
        firstName: 'John',
        lastName: 'Doe',
        number: i,
        visits: 100,
        status: 'In progress',
        progress: 50,
    })
}

const columnHelper = createColumnHelper<any>()

const columns = [
    columnHelper.accessor('firstName', {
        header: 'First Name',
    }),
    columnHelper.accessor('lastName', {
        header: 'Last Name',
    }),
    columnHelper.accessor('number', {
        header: 'Number',
    }),
    columnHelper.accessor('visits', {
        header: 'Visits',
    }),
    columnHelper.accessor('status', {
        header: 'Status',
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
    }),
]

export const ResponsesSampleGraph = ({ dashboard }: IResponsesSampleGraphProps) => {
    const [data, setData] = useState(() => [...defaultData])

    const table = useReactTable({
        data,
        columns,
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

    return (
        <Box>
            <GraphTitle dashboard={dashboard} text="A sample of 1000 responses" />
            <p className="mb-3">Question asked: {questionAsked}</p>

            {/* Table */}
            <table className="mb-3 w-full bg-white">
                <thead className="border-b border-b-gray-light">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border-r border-r-gray-light px-1 text-left font-normal">
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
                        <tr key={row.id} className="border-b border-b-gray-light">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border-r border-r-gray-light px-1">
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
                    {/* Go to first */}
                    <div className="text-sm" onClick={() => table.setPageIndex(0)}>
                        <Chevron double={true} direction="left" />
                    </div>
                    {/* Go to previous */}
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

                    {/* Go to next */}
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
                    {/* Go to last */}
                    <div className="text-sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                        <Chevron double={true} direction="right" />
                    </div>
                </div>
            </div>
        </Box>
    )
}
