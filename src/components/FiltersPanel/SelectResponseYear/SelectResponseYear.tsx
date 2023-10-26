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
