import { LegacyDashboardName } from '@enums'
import { classNames } from '@utils'
import { TDashboard } from '@types'

interface IGraphTitleProps {
    dashboard: TDashboard
    text: string
}

export const GraphTitle = ({ dashboard, text }: IGraphTitleProps) => {
    let titleClasses: string
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            titleClasses = 'font-noto-sans-bold text-pmnchColors-primary text-4xl'
            break
        default:
            titleClasses = 'text-4xl'
    }

    return <h2 className={classNames('mb-5', titleClasses)}>{text}</h2>
}
