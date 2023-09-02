import { TDashboard } from '@types'
import { useTranslation } from '@app/i18n'
import { getDashboardConfig } from '@utils'

interface ITitleProps {
    dashboard: TDashboard
    lang: string
    noHeading?: boolean
}

export const Title = async ({ dashboard, lang, noHeading }: ITitleProps) => {
    const { t } = await useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    // When using the title at multiple places, use noHeading to prevent multiple h1 tags
    return (
        <>
            {noHeading ? (
                <div className="font-proxima-nova mx-2 text-center text-4xl font-bold">
                    {t(`${config.campaignCode}-title`)}
                </div>
            ) : (
                <h1 className="font-proxima-nova mx-2 text-center text-4xl font-bold">
                    {t(`${config.campaignCode}-title`)}
                </h1>
            )}
        </>
    )
}
