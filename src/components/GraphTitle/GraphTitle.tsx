import { DashboardName } from '@enums'

interface IGraphTitleProps {
    dashboard: string
    text: string
}

export const GraphTitle = ({ dashboard, text }: IGraphTitleProps) => {
    let titleClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            titleClasses = 'font-1point8 text-pmnch-colors-primary text-5xl'
            break
        default:
            titleClasses = 'text-4xl'
    }

    return <h2 className={`mb-5 ${titleClasses}`}>{text}</h2>
}
