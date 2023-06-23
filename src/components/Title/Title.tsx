import { Dashboard } from '@types'
import { useTranslation } from '@app/i18n'
import { getDashboardConfig } from '@utils'

interface ITitleProps {
    dashboard: Dashboard
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
                <div className="mx-2 text-center font-proxima-nova text-4xl font-bold">
                    {t(`${config.campaignCode}-title`)}
                </div>
            ) : (
                <h1 className="mx-2 text-center font-proxima-nova text-4xl font-bold">
                    {t(`${config.campaignCode}-title`)}
                </h1>
            )}
        </>
    )
}
