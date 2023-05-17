import Link from 'next/link'
import Image from 'next/image'
import { Dashboards } from '@enums'

interface IHeaderLogosProps {
    dashboard: string
}

export const HeaderLogos = ({ dashboard }: IHeaderLogosProps) => {
    const WhatWomenWantLogo = () => {
        return (
            <div>
                <Link href={'/'}>
                    <Image
                        className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[5rem]"
                        src="/whatwomenwant/www_horizontal_logo.png"
                        alt="what women want logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }

    const PushWithWomenLogo = () => {
        return (
            <div>
                <Link href={'/'}>
                    <Image
                        className="max-h-[3rem] w-full max-w-[17rem] xl:max-h-[4rem]"
                        src="/midwivesvoices/push_with_women.png"
                        alt="push with women logo"
                        width={1117}
                        height={200}
                    />
                </Link>
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
                <Link href={'/'}>
                    <Image
                        className="my-[-17px] max-h-[5rem] w-full max-w-[20rem] xl:max-h-[5rem]"
                        src="/whatyoungpeoplewant/pmnch_logo.png"
                        alt="pmnch logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }

    switch (dashboard) {
        case Dashboards.WHAT_YOUNG_PEOPLE_WANT:
            return (
                <div className="flex items-center gap-x-2.5">
                    <_1point8Logo />
                    <PmnchLogo />
                </div>
            )
        case Dashboards.MIDWIVES_VOICES:
            return (
                <div className="flex items-center gap-x-2.5">
                    <WhatWomenWantLogo />
                    <PushWithWomenLogo />
                </div>
            )
        default:
            return <WhatWomenWantLogo />
    }
}
