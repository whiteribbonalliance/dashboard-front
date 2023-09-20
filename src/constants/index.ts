import { DashboardName } from '@enums'
import { IDashboardLink, ILanguage } from '@interfaces'
import { TFilter } from '@schemas/filter'

export const dashboards = Object.entries(DashboardName).map(([key, value]) => value)

export const seoMainTitle = 'White Ribbon Alliance'

export const whatwomenwantLink: IDashboardLink = {
    id: 'whatwomenwant',
    title: 'What Women Want',
    link: 'https://whatwomenwant.whiteribbonalliance.org',
}

export const whatyoungpeoplewantLink: IDashboardLink = {
    id: 'whatyoungpeoplewant',
    title: 'What Young People Want',
    link: 'https://whatyoungpeoplewant.whiteribbonalliance.org',
}

export const healthliteracyLink: IDashboardLink = {
    id: 'healthliteracy',
    title: 'Health Literacy',
    link: 'https://wwwliteracydashboard.whiteribbonalliance.org',
}

export const midwivesvoicesLink: IDashboardLink = {
    id: 'midwivesvoices',
    title: 'What Midwives Want',
    link: 'https://midwivesvoices.whiteribbonalliance.org',
}

export const healthwellbeingLink: IDashboardLink = {
    id: 'healthwellbeing',
    title: 'What women want for health and wellbeing',
    link: 'https://explore.whiteribbonalliance.org/healthwellbeing',
}

export const gizLink: IDashboardLink = {
    id: 'giz',
    title: 'Economic Empowerment in Mexico',
    link: 'https://explore.whiteribbonalliance.org/giz',
}

export const wwwpakistanLink: IDashboardLink = {
    id: 'wwwpakistan',
    title: 'What Women Want Pakistan',
    link: 'https://explore.whiteribbonalliance.org/wwwpakistan',
}

export const womenseconomicempowermentLink: IDashboardLink = {
    id: 'womenseconomicempowerment',
    title: "Women's Economic Empowerment",
    link: 'https://explore.whiteribbonalliance.org/womenseconomicempowerment',
}

export const defaultFilterValues: TFilter = {
    countries: [],
    regions: [],
    ages: [],
    genders: [],
    professions: [],
    response_topics: [],
    only_responses_from_categories: false,
    only_multi_word_phrases_containing_filter_term: false,
    keyword_filter: '',
    keyword_exclude: '',
}

// Languages supported by Cloud Translation API
export const languages: ILanguage[] = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'ak', name: 'Akan' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'ar', name: 'العربية' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'ay', name: 'Aymar aru' },
    { code: 'az', name: 'azərbaycan' },
    { code: 'be', name: 'беларуская' },
    { code: 'bg', name: 'български' },
    { code: 'bho', name: 'भोजपुरी' },
    { code: 'bm', name: 'bamanakan' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'bs', name: 'bosanski' },
    { code: 'ca', name: 'català' },
    { code: 'ceb', name: 'Binisaya' },
    { code: 'ckb', name: 'کوردیی ناوەندی' },
    { code: 'co', name: 'corsu' },
    { code: 'cs', name: 'čeština' },
    { code: 'cy', name: 'Cymraeg' },
    { code: 'da', name: 'dansk' },
    { code: 'de', name: 'Deutsch' },
    { code: 'doi', name: 'डोगरी' },
    { code: 'dv', name: 'ދިވެހި' },
    { code: 'ee', name: 'Eʋegbe' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'en', name: 'English' },
    { code: 'eo', name: 'esperanto' },
    { code: 'es', name: 'español' },
    { code: 'et', name: 'eesti' },
    { code: 'eu', name: 'euskara' },
    { code: 'fa', name: 'فارسی' },
    { code: 'fi', name: 'suomi' },
    { code: 'fil', name: 'Filipino' },
    { code: 'fr', name: 'français' },
    { code: 'fy', name: 'Frysk' },
    { code: 'ga', name: 'Gaeilge' },
    { code: 'gd', name: 'Gàidhlig' },
    { code: 'gl', name: 'galego' },
    { code: 'gn', name: 'Avañeʼẽ' },
    { code: 'gom', name: 'कोंकणी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ha', name: 'Hausa' },
    { code: 'haw', name: 'ʻŌlelo Hawaiʻi' },
    { code: 'he', name: 'עברית' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'hmn', name: 'lus Hmoob' },
    { code: 'hr', name: 'hrvatski' },
    { code: 'ht', name: 'kreyòl ayisyen' },
    { code: 'hu', name: 'magyar' },
    { code: 'hy', name: 'հայերեն' },
    { code: 'id', name: 'Indonesia' },
    { code: 'ig', name: 'Asụsụ Igbo' },
    { code: 'ilo', name: 'Ilokano' },
    { code: 'is', name: 'íslenska' },
    { code: 'it', name: 'italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'jv', name: 'Jawa' },
    { code: 'ka', name: 'ქართული' },
    { code: 'kk', name: 'қазақ тілі' },
    { code: 'km', name: 'ខ្មែរ' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ko', name: '한국어' },
    { code: 'kri', name: 'Krio' },
    { code: 'ku', name: 'kurdî' },
    { code: 'ky', name: 'кыргызча' },
    { code: 'la', name: 'Lingua Latīna' },
    { code: 'lb', name: 'Lëtzebuergesch' },
    { code: 'lg', name: 'Luganda' },
    { code: 'ln', name: 'lingála' },
    { code: 'lo', name: 'ລາວ' },
    { code: 'lt', name: 'lietuvių' },
    { code: 'lus', name: 'Mizo ṭawng' },
    { code: 'lv', name: 'latviešu' },
    { code: 'mai', name: 'मैथिली' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'mi', name: 'Māori' },
    { code: 'mk', name: 'македонски' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'mn', name: 'монгол' },
    { code: 'mni_mtei', name: 'ꯃꯩꯇꯩꯂꯣꯟ' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ms', name: 'Melayu' },
    { code: 'mt', name: 'Malti' },
    { code: 'my', name: 'မြန်မာ' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'no', name: 'norsk' },
    { code: 'nso', name: 'Sepedi' },
    { code: 'ny', name: 'Chichewa' },
    { code: 'om', name: 'Oromoo' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'pl', name: 'polski' },
    { code: 'ps', name: 'پښتو' },
    { code: 'pt', name: 'português' },
    { code: 'qu', name: 'Runasimi' },
    { code: 'ro', name: 'română' },
    { code: 'ru', name: 'русский' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'sa', name: 'संस्कृत' },
    { code: 'sd', name: 'سنڌي' },
    { code: 'si', name: 'සිංහල' },
    { code: 'sk', name: 'slovenčina' },
    { code: 'sl', name: 'slovenščina' },
    { code: 'sm', name: 'Gagana faʻa Sāmoa' },
    { code: 'sn', name: 'chiShona' },
    { code: 'so', name: 'Soomaali' },
    { code: 'sq', name: 'shqip' },
    { code: 'sr', name: 'српски' },
    { code: 'st', name: 'Sesotho' },
    { code: 'su', name: 'Basa Sunda' },
    { code: 'sv', name: 'svenska' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'tg', name: 'тоҷикӣ' },
    { code: 'th', name: 'ไทย' },
    { code: 'ti', name: 'ትግርኛ' },
    { code: 'tk', name: 'türkmen dili' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'ts', name: 'Xitsonga' },
    { code: 'tt', name: 'татар' },
    { code: 'ug', name: 'ئۇيغۇرچە' },
    { code: 'uk', name: 'українська' },
    { code: 'ur', name: 'اردو' },
    { code: 'uz', name: 'o‘zbek' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'xh', name: 'isiXhosa' },
    { code: 'yi', name: 'ייִדיש' },
    { code: 'yo', name: 'Èdè Yorùbá' },
    { code: 'zh', name: '中国人' },
    { code: 'zh_tw', name: '中國人' },
    { code: 'zu', name: 'isiZulu' },
]

export const defaultLanguage: ILanguage = { code: 'en', name: 'English' }

export const questionsCodes = ['q1', 'q2'] as const
