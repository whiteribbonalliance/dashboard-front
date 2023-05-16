import { Dashboards } from '@enums'

interface ITitleProps {
    dashboard: string
}

export const Title = ({ dashboard }: ITitleProps) => {
    // Set title
    let title: string
    switch (dashboard) {
        case Dashboards.WWW:
            title = 'What Women Want'
            break
        case Dashboards.PMNCH:
            title = 'What Young People Want'
            break
        case Dashboards.MIDWIVES_VOICES:
            title = 'What Midwives Want'
            break
        default:
            title = ''
    }

    return <h1 className="mx-2 text-center font-proxima-nova text-4xl font-bold">{title}</h1>
}
