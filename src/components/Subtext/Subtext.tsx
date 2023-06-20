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
        case DashboardName.HEALTH_WELL_BEING:
            subTextTranslation =
                'We asked women around the world, what they want to improve their health and wellbeing.'
            break
        case DashboardName.GIZ:
            subTextTranslation =
                'We asked 10603 women in Mexico the question, "¿Qué es lo que más deseas o necesitas para encontrar empleo o un mejor empleo? Por favor, comparte sólo la petición más importante para ti." (What do you most want or need to find a job or a better job? Please share only the request that is most important to you.)'
            break
        case DashboardName.WWW_PAKISTAN:
            subTextTranslation =
                'We asked 245311 women in Pakistan, what they want to improve their health and wellbeing.'
            break
        default:
            subTextTranslation = ''
    }

    return <p className="max-w-6xl text-center text-lg">{subTextTranslation}</p>
}
