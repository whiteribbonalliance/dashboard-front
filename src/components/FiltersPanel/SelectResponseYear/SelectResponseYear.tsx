'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@components/Box'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@app/i18n/client'
import { TDashboard, TOption } from '@types'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { useResponseYearStore } from '@stores/response-year'
import { responseYearSchema, TResponseYear } from '@schemas/response-year'
import { useCampaignQuery } from '@hooks/use-campaign-query'

interface ISelectResponseYearProps {
    dashboard: TDashboard
    lang: string
}

export const SelectResponseYear = ({ dashboard, lang }: ISelectResponseYearProps) => {
    const { t } = useTranslation(lang)
    const { data } = useCampaignQuery(dashboard, lang)
    const [options, setOptions] = useState<TOption<string>[]>([])
    const setResponseYear = useResponseYearStore((state) => state.setResponseYear)

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
        resolver: zodResolver(responseYearSchema),
    })

    // Watch field
    const responseYearField = form.watch('response_year')

    // Set default value for response_year
    useEffect(() => {
        if (form) {
            form.setValue('response_year', '')
        }
    }, [form])

    // Set response year
    useEffect(() => {
        if (responseYearField || responseYearField === '') {
            setResponseYear(responseYearField)
        }
    }, [responseYearField, setResponseYear])

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
