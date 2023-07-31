'use client'

import { TDashboard, TOption } from '@types'
import { useTranslation } from '@app/i18n/client'
import { getDashboardConfig } from '@utils'

export const useQuestionsAskedOptions = (dashboard: TDashboard) => {
    const questionsAskedOptions: TOption<string>[] = []
    const { t } = useTranslation(dashboard)
    const config = getDashboardConfig(dashboard)

    // Campaigns with one question only do not require questions asked options
    if (config.questionsAskedCodes.length < 2) {
        return questionsAskedOptions
    }

    // Set questions asked options
    for (let i = 0; i < config.questionsAskedCodes.length; i++) {
        const value = config.questionsAskedCodes[i]
        const label = t(`${dashboard}-${config.questionsAskedCodes[i]}`)
        questionsAskedOptions.push({ value, label })
    }

    return questionsAskedOptions
}
