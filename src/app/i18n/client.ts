'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions } from './settings'

i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, ns: string) => import(`./languages/${language}/${ns}.json`)))
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
    })
    .then()

const runsOnServerSide = typeof window === 'undefined'

export function useTranslation(language: string, ns: string = 'translation', options: UseTranslationOptions = {}) {
    const ret = useTranslationOrg(ns, options)
    const { i18n } = ret

    if (runsOnServerSide && i18n.resolvedLanguage !== language) {
        i18n.changeLanguage(language).then()
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (i18n.resolvedLanguage === language) return
            i18n.changeLanguage(language).then()
        }, [language, i18n])
    }

    return ret
}
