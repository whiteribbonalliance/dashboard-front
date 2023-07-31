import { TDashboard } from '@types'
import { useTranslation } from '@app/i18n'
import { applyToThousandsSepOnText, getDashboardConfig } from '@utils'
import { DashboardName } from '@enums'

interface ISubtextProps {
    dashboard: TDashboard
    lang: string
}

export const Subtext = async ({ dashboard, lang }: ISubtextProps) => {
    const { t } = await useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    return (
        <div className="max-w-6xl text-center text-lg">
            {dashboard === DashboardName.ECONOMIC_EMPOWERMENT_MEXICO ? (
                <>
                    <p className="mb-3">{applyToThousandsSepOnText(t('giz-asked-questions'), lang)}:</p>
                    <p className="mb-3">
                        “¿Qué es lo que más deseas o necesitas para encontrar empleo o un mejor empleo? Por favor,
                        comparte sólo la petición más importante para ti.“ ({t(`${dashboard}-q1`)})
                    </p>
                    <p>
                        “¿Qué debería hacer el gobierno para ayudarte a conseguir el trabajo de tus sueños? Por favor,
                        comparte sólo la petición más importante para ti.“ ({t(`${dashboard}-q2`)})
                    </p>
                </>
            ) : (
                <p>{applyToThousandsSepOnText(t(`${config.campaignCode}-subtext`), lang)}</p>
            )}
        </div>
    )
}
