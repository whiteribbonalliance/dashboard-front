'use client'

import { TDashboard, TOption } from '@types'
import { useTranslation } from '@app/i18n/client'
import { useCampaignQuery } from '@hooks/use-campaign-query'

export const useQuestionsAskedOptions = (dashboard: TDashboard, lang: string) => {
    const questionsAskedOptions: TOption<string>[] = []
    const { t } = useTranslation(lang)
    const { data } = useCampaignQuery(dashboard, lang)

    // Campaigns with one question only do not require questions asked options
    if (!data || (data && data.all_q_codes.length < 2)) {
        return []
    }

    // Set questions asked options
    for (let i = 0; i < data.all_q_codes.length; i++) {
        const value = data.all_q_codes[i]
        const label = t(`${dashboard}-${data.all_q_codes[i]}`)
        questionsAskedOptions.push({ value, label })
    }

    return questionsAskedOptions
}
