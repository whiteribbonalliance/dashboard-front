import Image from 'next/image'
import { DashboardName } from '@enums'
import { TDashboard } from '@types'

interface IHeaderLogosProps {
    dashboard: TDashboard
}

export const HeaderLogos = ({ dashboard }: IHeaderLogosProps) => {
    const WhiteRibbonAllianceLogo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[4rem]"
                    src="/wra_logo.png"
                    alt="white ribbon alliance logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    const WhatWomenWantLogo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[5rem]"
                    src="/whatwomenwant/www_horizontal_logo.png"
                    alt="what women want logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    const PushWithWomenLogo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[4rem]"
                    src="/midwivesvoices/push_with_women.png"
                    alt="push with women logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    const _1point8Logo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[4rem]"
                    src="/whatyoungpeoplewant/1point8_logo.png"
                    alt="1.8 logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    const PmnchLogo = () => {
        return (
            <div>
                <Image
                    className="my-[-10px] max-h-[3.5rem] w-full max-w-[20rem] xl:max-h-[5rem]"
                    src="/whatyoungpeoplewant/pmnch_logo.png"
                    alt="pmnch logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    const FsmLogo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[4rem]"
                    src="/whatwomenwantpakistan/fsm_logo.png"
                    alt="fsm logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    // Set logos
    switch (dashboard) {
        case DashboardName.WHAT_YOUNG_PEOPLE_WANT:
            return (
                <div className="flex items-center gap-x-5 xl:gap-x-3">
                    <_1point8Logo />
                    <PmnchLogo />
                </div>
            )
        case DashboardName.MIDWIVES_VOICES:
            return (
                <div className="flex items-center gap-x-5 xl:gap-x-3">
                    <WhatWomenWantLogo />
                    <PushWithWomenLogo />
                    <WhiteRibbonAllianceLogo />
                </div>
            )
        case DashboardName.WHAT_WOMEN_WANT_PAKISTAN:
            return (
                <div className="flex items-center gap-x-5 xl:gap-x-3">
                    <WhatWomenWantLogo />
                    <FsmLogo />
                    <WhiteRibbonAllianceLogo />
                </div>
            )
        default:
            return (
                <div className="flex items-center gap-x-5 xl:gap-x-3">
                    <WhiteRibbonAllianceLogo />
                    <WhatWomenWantLogo />
                </div>
            )
    }
}
