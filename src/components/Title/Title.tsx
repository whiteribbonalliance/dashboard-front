'use client'

import { DashboardName } from '@enums'
import { useTranslation } from '@app/i18n/client'

interface ITitleProps {
    dashboard: string
    lang: string
    renderAsDiv?: boolean
}

export const Title = ({ dashboard, lang, renderAsDiv }: ITitleProps) => {
    const { t } = useTranslation(lang)

    // Set title translation
    let titleTranslation: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            titleTranslation = t('www-title')
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            titleTranslation = t('pmnch-title')
            break
        case DashboardName.MIDWIVES_VOICES:
            titleTranslation = t('midwives-voices-title')
            break
        default:
            titleTranslation = ''
    }

    // When using the title at multiple places, use renderAsDiv to prevent multiple h1 tags
    return (
        <>
            {!renderAsDiv ? (
                <h1 className="mx-2 text-center font-proxima-nova text-4xl font-bold">{titleTranslation}</h1>
            ) : (
                <div className="mx-2 text-center font-proxima-nova text-4xl font-bold">{titleTranslation}</div>
            )}
        </>
    )
}
