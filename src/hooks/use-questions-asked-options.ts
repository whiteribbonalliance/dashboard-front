'use client'

import { TDashboard, TOption } from '@types'
import { useTranslation } from '@app/i18n/client'
import { getDashboardConfig } from '@utils'

export const useQuestionsAskedOptions = (dashboard: TDashboard) => {
    const questionsAskedOptions: TOption<string>[] = []
    const { t } = useTranslation(dashboard)
    const config = getDashboardConfig(dashboard)

    // Set questions asked options
    for (let i = 0; i < config.questionsAskedCodes.length; i++) {
        const label = t(`${dashboard}-${config.questionsAskedCodes[i]}`)
        questionsAskedOptions.push({ value: config.questionsAskedCodes[i], label: label })
    }

    return questionsAskedOptions
}
