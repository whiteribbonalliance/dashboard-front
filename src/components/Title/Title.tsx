'use client'

import { TDashboard } from '@types'
import { useTranslation } from '@app/i18n/client'
import { getDashboardConfig } from '@utils'
import { DashboardName } from '@enums'

interface ITitleProps {
    dashboard: TDashboard
    lang: string
    noHeading?: boolean
}

export const Title = ({ dashboard, lang, noHeading = false }: ITitleProps) => {
    const { t } = useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    // Set title
    let title: string
    switch (dashboard) {
        case DashboardName.ALL_CAMPAIGNS:
            title = t('allcampaigns-title')
            break
        default:
            title = t(`${config.campaignCode}-title`)
    }

    // When using the title at multiple places, use noHeading to prevent multiple h1 tags
    return (
        <>
            {noHeading ? (
                <div className="font-proxima-nova mx-2 text-center text-4xl font-bold">{title}</div>
            ) : (
                <h1 className="font-proxima-nova mx-2 text-center text-4xl font-bold">{title}</h1>
            )}
        </>
    )
}
