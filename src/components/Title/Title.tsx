import { DashboardName } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'

interface ITitleProps {
    dashboard: string
    renderAsDiv?: boolean
}

export const Title = ({ dashboard, renderAsDiv }: ITitleProps) => {
    // Set title
    let title: string
    switch (dashboard) {
        case DashboardName.WHAT_WOMEN_WANT:
            title = whatWomenWantConfig.title
            break
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            title = whatYoungPeopleWantConfig.title
            break
        case DashboardName.MIDWIVES_VOICES:
            title = midwivesVoicesConfig.title
            break
        default:
            title = ''
    }

    // When using the title at multiple places, use renderAsDiv to prevent multiple h1 tags
    return (
        <>
            {!renderAsDiv ? (
                <h1 className="mx-2 text-center font-proxima-nova text-4xl font-bold">{title}</h1>
            ) : (
                <div className="mx-2 text-center font-proxima-nova text-4xl font-bold">{title}</div>
            )}
        </>
    )
}
