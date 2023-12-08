/*
MIT License

Copyright (c) 2023 White Ribbon Alliance. Maintainers: Thomas Wood, https://fastdatascience.com, Zairon Jacobs, https://zaironjacobs.com.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

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
        preload: runsOnServerSide ? languages : [],
    })
    .then()

export function useTranslation(lang: string, ns: string = 'translation', options: UseTranslationOptions<any> = {}) {
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
