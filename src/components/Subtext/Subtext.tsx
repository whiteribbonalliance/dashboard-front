import { Dashboard } from '@types'
import { useTranslation } from '@app/i18n'
import { getDashboardConfig } from '@utils'

interface ISubtextProps {
    dashboard: Dashboard
    lang: string
}

export const Subtext = async ({ dashboard, lang }: ISubtextProps) => {
    const { t } = await useTranslation(lang)
    const config = getDashboardConfig(dashboard)

    return <p className="max-w-6xl text-center text-lg">{t(`${config.campaignCode}-subtext`)}</p>
}
