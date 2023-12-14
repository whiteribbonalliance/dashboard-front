import { LegacyDashboardName } from '@enums'
import { classNames } from '@utils'
import { TDashboard } from '@types'

interface IButtonProps {
    text: string
    size?: 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
    disabled?: boolean
    dashboard?: TDashboard
}

export const Button = ({ text, size = 'text-base', disabled = false, dashboard }: IButtonProps) => {
    // Set button classes
    let buttonClasses: string
    const disabledButtonCommonStyles = 'text-gray border-gray cursor-default'
    switch (dashboard) {
        case LegacyDashboardName.WHAT_YOUNG_PEOPLE_WANT:
            buttonClasses = classNames(
                disabled
                    ? disabledButtonCommonStyles
                    : 'text-pmnchColors-primary border-pmnchColors-primary hover:bg-pmnchColors-primary hover:text-white'
            )
            break
        default:
            buttonClasses = classNames(
                disabled
                    ? disabledButtonCommonStyles
                    : 'text-defaultColors-primary border-defaultColors-primary hover:bg-defaultColors-primary hover:text-white'
            )
    }

    return (
        <button
            className={classNames(
                'flex items-center whitespace-nowrap rounded-md border px-3 py-2 font-bold',
                size,
                buttonClasses
            )}
        >
            <div className="flex items-center">{text}</div>
        </button>
    )
}
