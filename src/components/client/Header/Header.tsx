'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'

interface IHeaderProps {
    dashboard: string
}

export const Header = ({ dashboard }: IHeaderProps) => {
    return (
        <Disclosure as="header" className="shadow-gray-200 shadow-md">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between py-5 pl-3 pr-5">
                        <div className="flex items-center">
                            {/* Button to display filters */}
                            <div className="flex cursor-pointer">
                                <FontAwesomeIcon className="text-3xl" icon={faChevronLeft} />
                                <FontAwesomeIcon className="ml-[-0.6rem] text-3xl" icon={faChevronLeft} />
                            </div>

                            {/* Logo */}
                            <div className="ml-2.5 ">
                                <Link href={'/'}>
                                    <Image
                                        className="w-full max-w-[17rem]"
                                        src="/www_horizontal_logo.png"
                                        alt="what women want logo"
                                        width={1117}
                                        height={200}
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Button to display mobile dropdown */}
                        <Disclosure.Button className="xl:hidden">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <FontAwesomeIcon className="text-4xl" icon={faXmark} />
                            ) : (
                                <FontAwesomeIcon className="text-3xl" icon={faBars} />
                            )}
                        </Disclosure.Button>
                    </div>

                    {/* Mobile dropdown */}
                    <Disclosure.Panel as="ul" className="bg-default-primary-color xl:hidden">
                        <li className="cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white hover:text-default-font-color">
                            [Language selector here]
                        </li>
                        <li className="cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white hover:text-default-font-color">
                            <Link href={'https://whiteribbonalliance.org/campaigns/what-women-want/'} target="_blank">
                                About Us
                            </Link>
                        </li>
                        <li className="cursor-pointer py-2 text-center text-xl font-bold text-white hover:bg-white hover:text-default-font-color">
                            <Link href={'https://www.youtube.com/watch?v=nBzide5J3Hk'} target="_blank">
                                Show Video
                            </Link>
                        </li>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
