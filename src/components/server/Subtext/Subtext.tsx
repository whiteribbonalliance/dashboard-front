import { Dashboards } from '@enums'
import { midwivesVoicesConfig, whatWomenWantConfig, whatYoungPeopleWantConfig } from '@configurations'

interface ISubtextProps {
    dashboard: string
}

export const Subtext = ({ dashboard }: ISubtextProps) => {
    // Set subtext
    let subText: string
    switch (dashboard) {
        case Dashboards.WHAT_WOMEN_WANT:
            subText = whatWomenWantConfig.subtext
            break
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            subText = whatYoungPeopleWantConfig.subtext
            break
        case Dashboards.MIDWIVES_VOICES:
            subText = midwivesVoicesConfig.subtext
            break
        default:
            subText = ''
    }

    return <p className="max-w-6xl text-center text-lg">{subText}</p>
}
