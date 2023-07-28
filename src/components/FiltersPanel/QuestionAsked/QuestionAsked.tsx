'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { questionAskedSchema, TQuestionAsked } from '@schemas/question-asked'
import { Box } from '@components/Box'
import React, { useEffect } from 'react'
import { useTranslation } from '@app/i18n/client'
import { TDashboard } from '@types'
import { SelectSingleValue } from '@components/SelectSingleValue'
import { useQuestionAskedCodeStore } from '@stores/question-asked-code'
import { useQuestionsAskedOptions } from '@hooks/use-questions-asked-options'

interface IQuestionAskedProps {
    dashboard: TDashboard
}

export const QuestionAsked = ({ dashboard }: IQuestionAskedProps) => {
    const { t } = useTranslation(dashboard)
    const questionsAskedOptions = useQuestionsAskedOptions(dashboard)
    const setQuestionAskedCode = useQuestionAskedCodeStore((state) => state.setQuestionAskedCode)

    // Form
    const form = useForm<TQuestionAsked>({
        resolver: zodResolver(questionAskedSchema),
    })

    // Watch field
    const questionAskedCodeField = form.watch('question_asked_code')

    // Set default value for question_asked_code
    useEffect(() => {
        if (form) {
            form.setValue('question_asked_code', 'q1')
        }
    }, [form])

    // Set question asked code
    useEffect(() => {
        setQuestionAskedCode(questionAskedCodeField)
    }, [questionAskedCodeField, setQuestionAskedCode])

    return (
        <Box>
            <p className="font-bold">{t('question-asked')}:</p>

            {/* Select */}
            {questionsAskedOptions.length > 0 && (
                <div className="mt-3 w-full">
                    <Controller
                        name="question_asked_code"
                        control={form.control}
                        render={({ field: { onChange, value } }) => (
                            <SelectSingleValue
                                id="select-question-asked-code"
                                options={questionsAskedOptions}
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
