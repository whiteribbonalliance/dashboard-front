import Link from 'next/link'
import Image from 'next/image'
import { Dashboards } from '@enums'

interface IHeaderLogosProps {
    dashboard: string
}

export const HeaderLogos = ({ dashboard }: IHeaderLogosProps) => {
    const WhatWomenWantLogo = () => {
        return (
            <div className="ml-2.5">
                <Link href={'/'}>
                    <Image
                        className="w-full max-w-[17rem]"
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
            <div className="ml-2.5">
                <Image
                    className="w-full max-w-[8rem]"
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
            <div className="ml-2.5">
                <Image
                    className="w-full max-w-[9rem]"
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
                <>
                    <_1point8Logo />
                    <PmnchLogo />
                </>
            )
        case Dashboards.MIDWIVES_VOICES:
            return <WhatWomenWantLogo />
        default:
            return <WhatWomenWantLogo />
    }
}
