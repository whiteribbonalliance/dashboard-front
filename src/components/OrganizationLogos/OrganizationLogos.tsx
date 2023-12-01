import Image from 'next/image'
import { DashboardName } from '@enums'
import { TDashboard } from '@types'
import Link from 'next/link'

interface IOrganizationLogosProps {
    dashboard: TDashboard
}

export const OrganizationLogos = ({ dashboard }: IOrganizationLogosProps) => {
    // General logos
    const WhiteRibbonAllianceLogo = () => {
        return (
            <div>
                <Link href="https://whiteribbonalliance.org" target="_blank">
                    <Image
                        className="max-h-[3rem] w-full max-w-[17rem] object-contain xl:max-h-[4rem]"
                        src="/logos/wra_logo.png"
                        alt="white ribbon alliance logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }

    // These logos are used at healthwellbeing
    const CHCLogo = () => {
        return (
            <div>
                <Link href="https://childhelplinecambodia.org" target="_blank">
                    <Image
                        className="max-h-[7rem] w-full max-w-[17rem] object-contain xl:max-h-[9rem]"
                        src="/logos/chc_logo.jpg"
                        alt="child helpline cambodia logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const CiniLogo = () => {
        return (
            <div>
                <Link href="https://www.cini-india.org" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/cini_logo.jpg"
                        alt="child in need institute logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const CorhaLogo = () => {
        return (
            <div>
                <Link href="https://corhaethiopia.org/" target="_blank">
                    <Image
                        className="max-h-[5rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/corha_logo.png"
                        alt="corha logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const CoseLogo = () => {
        return (
            <div>
                <Link href="https://cose.org.ph" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/cose_logo.png"
                        alt="cose logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const DiyaLogo = () => {
        return (
            <div>
                <Link href="http://www.diyafoundation-india.org" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[5rem]"
                        src="/logos/diya_logo.png"
                        alt="diya logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const DafadoyLogo = () => {
        return (
            <div>
                <Link href="https://collectifdafadoy.org" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/dafadoy_logo.png"
                        alt="dafadoy logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const DesmasLogo = () => {
        return (
            <div>
                <Link href="https://desmasgh.com" target="_blank">
                    <Image
                        className="max-h-[9rem] w-full max-w-[17rem] object-contain xl:max-h-[9rem]"
                        src="/logos/desmas_logo.png"
                        alt="desmas logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const EquidadDeGeneroLogo = () => {
        return (
            <div>
                <Link href="https://equidad.org.mx" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/equidad_de_genero_logo.png"
                        alt="equidad de genero logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const GiwynLogo = () => {
        return (
            <div>
                <Link href="https://giwyn.org" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/giwyn_logo.png"
                        alt="giwyn logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const HelpAgeIndiaLogo = () => {
        return (
            <div>
                <Link href="https://www.helpageindia.org" target="_blank">
                    <Image
                        className="max-h-[3rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/help_age_india_logo.png"
                        alt="help age india logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    // const MadevLogo = () => {
    //     return (
    //         <div>
    //             <Link href="https://madevegypt.org/ar" target="_blank">
    //                 <Image
    //                     className="max-h-[8rem] w-full max-w-[17rem] object-contain xl:max-h-[7rem]"
    //                     src="/logos/madev_logo.png"
    //                     alt="media arts for development logo"
    //                     width={1117}
    //                     height={200}
    //                 />
    //             </Link>
    //         </div>
    //     )
    // }
    const MusaLogo = () => {
        return (
            <div>
                <Link href="https://www.muthande.org.za" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/musa_logo.png"
                        alt="muthande society for the aged logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const NigeriaHealthWatchLogo = () => {
        return (
            <div>
                <Link href="https://nigeriahealthwatch.com" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/nigeria_health_watch_logo.jpg"
                        alt="nigeria health watch logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const RedCrossSerbiaLogo = () => {
        return (
            <div>
                <Link href="https://redcross.org.rs/en" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/red_cross_serbia_logo.png"
                        alt="red cross serbia logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const SosJdLogo = () => {
        return (
            <div>
                <Link href="https://sosjd.org/" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[6rem]"
                        src="/logos/sos_jd_logo.png"
                        alt="sos jeunesse & défi logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const SweatLogo = () => {
        return (
            <div>
                <Link href="https://www.sweat.org.za" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[5rem]"
                        src="/logos/sweat_logo.jpg"
                        alt="sweat logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }
    const WraKenyaLogo = () => {
        return (
            <div>
                <Link href="https://www.whiteribbonalliancekenya.org" target="_blank">
                    <Image
                        className="max-h-[6rem] w-full max-w-[17rem] object-contain xl:max-h-[7rem]"
                        src="/logos/wra_kenya_logo.png"
                        alt="wra kenya logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }

    // These logos are used at whatwomenwant
    const WhatWomenWantLogo = () => {
        return (
            <div>
                <Link href="https://whiteribbonalliance.org/movements/womens-health" target="_blank">
                    <Image
                        className="max-h-[3rem] w-full max-w-[17rem] object-contain xl:max-h-[5rem]"
                        src="/logos/www_horizontal_logo.png"
                        alt="what women want logo"
                        width={1117}
                        height={200}
                    />
                </Link>
            </div>
        )
    }

    // These logos are used at midwivesvoices
    const PushWithWomenLogo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] object-contain xl:max-h-[4rem]"
                    src="/logos/push_with_women_logo.png"
                    alt="push with women logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    // These logos are used at whatyoungpeoplewant
    const _1point8Logo = () => {
        return (
            <div>
                <Image
                    className="max-h-[3rem] w-full max-w-[17rem] object-contain xl:max-h-[4rem]"
                    src="/logos/1point8_logo.png"
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
                    className="my-[-10px] max-h-[3.5rem] w-full max-w-[20rem] object-contain xl:max-h-[5rem]"
                    src="/logos/pmnch_logo.png"
                    alt="pmnch logo"
                    width={1117}
                    height={200}
                />
            </div>
        )
    }

    // These logos are used at healthwellbeing and wwwpakistan
    const FsmLogo = () => {
        return (
            <div>
                <Link href="https://fsm.org.pk" target="_blank">
                    <Image
                        className="max-h-[3rem] w-full max-w-[17rem] object-contain xl:max-h-[3rem]"
                        src="/logos/fsm_logo.png"
                        alt="fsm logo"
                        width={1117}
                        height={200}
                    />
                </Link>
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
        case DashboardName.HEALTHWELLBEING:
            return (
                <div className="flex w-full flex-col gap-y-5">
                    <div className="grid w-full max-w-[125rem] grid-cols-3 items-center justify-items-center gap-x-3 gap-y-5 xl:grid-cols-5 xl:gap-x-1">
                        <WhiteRibbonAllianceLogo />
                        <WhatWomenWantLogo />
                    </div>
                    <div className="grid w-full max-w-[125rem] grid-cols-3 items-center justify-items-center gap-x-3 gap-y-5 xl:grid-cols-5 xl:gap-x-1">
                        <CHCLogo />
                        <CiniLogo />
                        <CorhaLogo />
                        <CoseLogo />
                        <DiyaLogo />
                        <DafadoyLogo />
                        <DesmasLogo />
                        <EquidadDeGeneroLogo />
                        <FsmLogo />
                        <GiwynLogo />
                        <HelpAgeIndiaLogo />
                        {/*<MadevLogo />*/}
                        <MusaLogo />
                        <NigeriaHealthWatchLogo />
                        <RedCrossSerbiaLogo />
                        <SosJdLogo />
                        <SweatLogo />
                        <WraKenyaLogo />
                    </div>
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
