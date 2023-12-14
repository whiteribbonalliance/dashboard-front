'use client'

import { useTranslation } from '@app/i18n/client'
import { getDashboardConfig } from '@utils'
import { LegacyDashboardName } from '@enums'
import { useContext } from 'react'
import { ParamsContext } from '@contexts/params'

interface ITitleProps {
    noHeading?: boolean
}

export const Title = ({ noHeading = false }: ITitleProps) => {
    const { params } = useContext(ParamsContext)
    const { dashboard, lang } = params

    const { t } = useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    // Set title
    let title: string
    switch (dashboard) {
        case LegacyDashboardName.ALL_CAMPAIGNS:
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
