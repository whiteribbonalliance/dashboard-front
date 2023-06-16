'use client'

import { DashboardName } from '@enums'
import { useTranslation } from '@app/i18n/client'

interface ISubtextProps {
    dashboard: string
    lang: string
}

export const Subtext = ({ dashboard, lang }: ISubtextProps) => {
    const { t } = useTranslation(lang)

    // Set subtext translation
    let subTextTranslation: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            subTextTranslation = t('www-subtext')
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            subTextTranslation = t('pmnch-subtext')
            break
        case DashboardName.MIDWIVES_VOICES:
            subTextTranslation = t('midwives-voices-subtext')
            break
        default:
            subTextTranslation = ''
    }

    return <p className="max-w-6xl text-center text-lg">{subTextTranslation}</p>
}
