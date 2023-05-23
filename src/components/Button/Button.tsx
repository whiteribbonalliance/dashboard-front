import { DashboardName } from '@enums'

interface IButtonProps {
    dashboard?: string
    text: string
}

export const Button = ({ text, dashboard }: IButtonProps) => {
    // Set button classes
    let buttonClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            buttonClasses = 'text-pmnch-colors-primary border-pmnch-colors-primary hover:bg-pmnch-colors-primary'
            break
        default:
            buttonClasses = 'text-default-colors-primary border-default-colors-primary hover:bg-default-colors-primary'
    }

    return (
        <button
            className={`flex items-center whitespace-nowrap rounded-md border px-3 py-2.5 text-xl font-bold hover:text-white ${buttonClasses}`}
        >
            <div className="flex items-center">{text}</div>
        </button>
    )
}
