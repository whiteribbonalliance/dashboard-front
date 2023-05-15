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
                        src="/logos/whatwomenwant/www_horizontal_logo.png"
                        alt="what women want logo"
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
                    src="/logos/whatyoungpeoplewant/1point8_logo.png"
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
                    className="max-h-[3rem] w-full max-w-[20rem] xl:max-h-[5rem]"
                    src="/logos/whatyoungpeoplewant/pmnch_logo.png"
                    alt="pmnch logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    switch (dashboard) {
        case Dashboards.WWW:
            return <WhatWomenWantLogo />
        case Dashboards.PMNCH:
            return (
                <div className="flex items-center gap-x-2.5">
                    <_1point8Logo />
                    <PmnchLogo />
                </div>
            )
        case Dashboards.MIDWIVES_VOICES:
            return <WhatWomenWantLogo />
        default:
            return <WhatWomenWantLogo />
    }
}
