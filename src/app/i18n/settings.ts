import { languages as allLanguages } from '@constants'

export const fallbackLanguage = 'en'
export const languages = allLanguages.map((language) => language.code)
export const defaultNS = 'translation'

export function getOptions(language = fallbackLanguage, ns = defaultNS) {
    return {
        supportedLngs: languages,
        fallbackLng: fallbackLanguage,
        language,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    }
}
