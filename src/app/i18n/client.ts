'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions } from './settings'

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((lang: string, ns: string) => import(`./languages/${lang}/${ns}.json`)))
    .init({
        ...getOptions(),
        lng: undefined, // Detect the language client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
    })
    .then()

const runsOnServerSide = typeof window === 'undefined'

export function useTranslation(lang: string, ns: string = 'translation', options: UseTranslationOptions = {}) {
    const ret = useTranslationOrg(ns, options)
    const { i18n } = ret

    if (runsOnServerSide && i18n.resolvedLanguage !== lang) {
        i18n.changeLanguage(lang).then()
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (i18n.resolvedLanguage !== lang) {
                i18n.changeLanguage(lang).then()
            }
        }, [lang, i18n])
    }

    return ret
}
