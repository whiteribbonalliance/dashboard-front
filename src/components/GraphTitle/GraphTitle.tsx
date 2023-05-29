import { DashboardName } from '@enums'
import { classNames } from '@utils'

interface IGraphTitleProps {
    dashboard: string
    text: string
}

export const GraphTitle = ({ dashboard, text }: IGraphTitleProps) => {
    let titleClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            titleClasses = 'font-1point8 text-pmnchColors-primary text-5xl'
            break
        default:
            titleClasses = 'text-4xl'
    }

    return <h2 className={classNames('mb-5', titleClasses)}>{text}</h2>
}
