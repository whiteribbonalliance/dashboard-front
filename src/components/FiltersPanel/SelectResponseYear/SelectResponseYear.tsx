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

'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@components/Box'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from '@app/i18n/client'
import { TOption } from '@types'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { responseYearSchema, TResponseYear } from '@schemas/response-year'
import { useCampaignQuery } from '@hooks/use-campaign-query'
import { ParamsContext } from '@contexts/params'
import { produce } from 'immer'

interface ISelectResponseYearProps {
    hideWhileLoading?: boolean
}

export const SelectResponseYear = ({ hideWhileLoading = false }: ISelectResponseYearProps) => {
    const { params, setParams } = useContext(ParamsContext)
    const { lang } = params

    const { t } = useTranslation(lang)
    const { data, isLoading, isRefetching } = useCampaignQuery()
    const [options, setOptions] = useState<TOption<string>[]>([])

    // Set options
    useEffect(() => {
        if (data) {
            const tmpOptions: TOption<string>[] = []
            tmpOptions.push({ label: 'All', value: '' })
            tmpOptions.push(
                ...data.all_response_years.map((response_year) => {
                    return { label: response_year, value: response_year }
                })
            )
            setOptions(tmpOptions)
        }
    }, [data])

    // Form
    const form = useForm<TResponseYear>({
        defaultValues: { response_year: params.responseYear },
        resolver: zodResolver(responseYearSchema),
    })

    // Watch field
    const responseYearField = form.watch('response_year')

    // Set response year
    useEffect(() => {
        if (responseYearField || responseYearField === '') {
            setParams((prev) => {
                return produce(prev, (draft) => {
                    draft.responseYear = responseYearField
                })
            })
        }
    }, [responseYearField, setParams])

    if (options.length < 1) return null

    if (hideWhileLoading) {
        if (isLoading || isRefetching) return null
    }

    return (
        <Box>
            <p className="font-bold">{t('response-year')}:</p>

            {/* Select */}
            {options.length > 0 && (
                <div className="mt-3 w-full">
                    <Controller
                        name="response_year"
                        control={form.control}
                        render={({ field: { onChange, value } }) => (
                            <SelectSingleValue
                                id="select-response-year"
                                options={options}
                                value={value}
                                controllerRenderOnChange={onChange}
                            />
                        )}
                    />
                </div>
            )}
        </Box>
    )
}
