import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'
import { UseTranslationOptions } from 'react-i18next'

const initI18next = async (lang: string, ns: string) => {
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((lang: string, ns: string) => import(`./languages/${lang}/${ns}.json`)))
        .init(getOptions(lang, ns))
        .then()

    return i18nInstance
}

export async function useTranslation(
    lang: string,
    ns: string = 'translation',
    options: UseTranslationOptions = {}
) {
    const i18nextInstance = await initI18next(lang, ns)

    return {
        // @ts-ignore
        t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
        i18n: i18nextInstance,
    }
}
