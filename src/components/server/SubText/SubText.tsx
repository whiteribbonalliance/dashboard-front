import { Dashboards } from '@enums'

interface ISubTextProps {
    dashboard: string
}

export const SubText = ({ dashboard }: ISubTextProps) => {
    // Set sub text
    let subText: string
    switch (dashboard) {
        case Dashboards.WWW:
            subText =
                'Gain access to the 1.2 million open-ended responses through this interactive dashboard, a unique tool that connects women’s and girls’ voices with the almost infinite possibilities of digital analysis.'
            break
        case Dashboards.PMNCH:
            subText =
                'Welcome to the “What Young People Want” Dashboard! This interactive tool provides a visual representation of the responses and insights we’ve gathered from young people aged 10-24 around the world, categorized into five key domains: Good Health & Optimum Nutrition, Connectedness and Positive Values, Safety and Supportive Environments, Learning and Employability, and Agency and Resilience. Here. You’ll find trends, patterns, and themes that have emerged from their voices across these domains. This dashboard is designed to help inform policymakers, organizations, and stakeholders about the priorities, concerns, and aspirations of today’s youth, ultimately guiding decisions and investments that impact their health and well-being. Explore the data, discover the stories behind the numbers, and join us in amplifying the voices of 1.8 billion young people worldwide. To learn more about the five domains and the campaign, visit www.1point8.org.'
            break
        case Dashboards.MIDWIVES_VOICES:
            subText =
                'We asked midwives around the world the question: “What do you want most in your role as a midwife?”'
            break
        default:
            subText = ''
    }

    return <p className="max-w-6xl text-center text-lg">{subText}</p>
}
