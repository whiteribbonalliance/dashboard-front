'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionAskedSchema, TQuestionAsked } from '@schemas/question-asked'
import { Box } from '@components/Box'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from '@app/i18n/client'
import { TOption } from '@types'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { useCampaignQuery } from '@hooks/use-campaign-query'
import { ParamsContext } from '@contexts/params'
import { produce } from 'immer'

interface ISelectQuestionAskedProps {
    hideWhileLoading?: boolean
}

export const SelectQuestionAsked = ({ hideWhileLoading = false }: ISelectQuestionAskedProps) => {
    const { params, setParams } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const { data, isLoading, isRefetching } = useCampaignQuery()
    const { t } = useTranslation(lang)
    const [options, setOptions] = useState<TOption<string>[]>([])

    // Set options
    useEffect(() => {
        if (data) {
            const tmpOptions: TOption<string>[] = []
            for (let i = 0; i < data.all_q_codes.length; i++) {
                const value = data.all_q_codes[i]
                const label = t(`${dashboard}-${data.all_q_codes[i]}`)
                tmpOptions.push({ value, label })
            }
            setOptions(tmpOptions)
        }
    }, [dashboard, t, data])

    // Form
    const form = useForm<TQuestionAsked>({
        defaultValues: { question_asked_code: params.questionAskedCode },
        resolver: zodResolver(questionAskedSchema),
    })

    // Watch field
    const questionAskedCodeField = form.watch('question_asked_code')

    // Set question asked code
    useEffect(() => {
        if (questionAskedCodeField) {
            setParams((prev) => {
                return produce(prev, (draft) => {
                    draft.questionAskedCode = questionAskedCodeField
                })
            })
        }
    }, [questionAskedCodeField, setParams])

    if (options.length < 2) return null

    if (hideWhileLoading) {
        if (isLoading || isRefetching) return null
    }

    return (
        <Box>
            <p className="font-bold">{t('question-asked')}:</p>

            {/* Select */}
            {options.length > 0 && (
                <div className="mt-3 w-full">
                    <Controller
                        name="question_asked_code"
                        control={form.control}
                        render={({ field: { onChange, value } }) => (
                            <SelectSingleValue
                                id="select-question-asked-code"
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
