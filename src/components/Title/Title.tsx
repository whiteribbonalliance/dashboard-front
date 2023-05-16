import { Dashboards } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'

interface ITitleProps {
    dashboard: string
}

export const Title = ({ dashboard }: ITitleProps) => {
    // Set title
    let title: string
    switch (dashboard) {
        case Dashboards.WHAT_WOMEN_WANT:
            title = whatWomenWantConfig.title
            break
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            title = whatYoungPeopleWantConfig.title
            break
        case Dashboards.MIDWIVES_VOICES:
            title = midwivesVoicesConfig.title
            break
        default:
            title = ''
    }

    return <h1 className="mx-2 text-center font-proxima-nova text-4xl font-bold">{title}</h1>
}
