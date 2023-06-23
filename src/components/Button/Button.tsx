import { DashboardName } from '@enums'
import { classNames } from '@utils'
import { Dashboard } from '@types'

interface IButtonProps {
    dashboard?: Dashboard
    text: string
}

export const Button = ({ text, dashboard }: IButtonProps) => {
    // Set button classes
    let buttonClasses: string
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            buttonClasses = 'text-pmnchColors-primary border-pmnchColors-primary hover:bg-pmnchColors-primary'
            break
        default:
            buttonClasses = 'text-defaultColors-primary border-defaultColors-primary hover:bg-defaultColors-primary'
    }

    return (
        <button
            className={classNames(
                'flex items-center whitespace-nowrap rounded-md border px-3 py-2.5 text-xl font-bold hover:text-white',
                buttonClasses
            )}
        >
            <div className="flex items-center">{text}</div>
        </button>
    )
}
