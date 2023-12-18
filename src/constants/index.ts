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

import { ILanguage } from '@interfaces'
import _ from 'lodash'

// Google languages
export const languagesGoogle: ILanguage[] = [
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

// Azure languages
export const languagesAzure: ILanguage[] = [
    {
        code: 'af',
        name: 'Afrikaans',
    },
    {
        code: 'sq',
        name: 'shqip',
    },
    {
        code: 'am',
        name: 'አማርኛ',
    },
    {
        code: 'ar',
        name: 'العربية',
    },
    {
        code: 'hy',
        name: 'հայերեն',
    },
    {
        code: 'as',
        name: 'অসমীয়া',
    },
    {
        code: 'az',
        name: 'azərbaycan',
    },
    {
        code: 'bn',
        name: 'বাংলা',
    },
    {
        code: 'ba',
        name: 'Bashkir',
    },
    {
        code: 'eu',
        name: 'euskara',
    },
    {
        code: 'bho',
        name: 'भोजपुरी',
    },
    {
        code: 'brx',
        name: 'Bodo',
    },
    {
        code: 'bs',
        name: 'bosanski',
    },
    {
        code: 'bg',
        name: 'български',
    },
    {
        code: 'yue',
        name: 'Cantonese (Traditional)',
    },
    {
        code: 'ca',
        name: 'català',
    },
    {
        code: 'lzh',
        name: 'Chinese (Literary)',
    },
    {
        code: 'zh-Hans',
        name: 'Chinese Simplified',
    },
    {
        code: 'zh-Hant',
        name: 'Chinese Traditional',
    },
    {
        code: 'sn',
        name: 'chiShona',
    },
    {
        code: 'hr',
        name: 'hrvatski',
    },
    {
        code: 'cs',
        name: 'čeština',
    },
    {
        code: 'da',
        name: 'dansk',
    },
    {
        code: 'prs',
        name: 'Dari',
    },
    {
        code: 'dv',
        name: 'ދިވެހި',
    },
    {
        code: 'doi',
        name: 'डोगरी',
    },
    {
        code: 'nl',
        name: 'Nederlands',
    },
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'et',
        name: 'eesti',
    },
    {
        code: 'fo',
        name: 'Faroese',
    },
    {
        code: 'fj',
        name: 'Fijian',
    },
    {
        code: 'fil',
        name: 'Filipino',
    },
    {
        code: 'fi',
        name: 'suomi',
    },
    {
        code: 'fr',
        name: 'français',
    },
    {
        code: 'fr-ca',
        name: 'French (Canada)',
    },
    {
        code: 'gl',
        name: 'galego',
    },
    {
        code: 'ka',
        name: 'ქართული',
    },
    {
        code: 'de',
        name: 'Deutsch',
    },
    {
        code: 'el',
        name: 'Ελληνικά',
    },
    {
        code: 'gu',
        name: 'ગુજરાતી',
    },
    {
        code: 'ht',
        name: 'kreyòl ayisyen',
    },
    {
        code: 'ha',
        name: 'Hausa',
    },
    {
        code: 'he',
        name: 'עברית',
    },
    {
        code: 'hi',
        name: 'हिन्दी',
    },
    {
        code: 'mww',
        name: 'Hmong Daw (Latin)',
    },
    {
        code: 'hu',
        name: 'magyar',
    },
    {
        code: 'is',
        name: 'íslenska',
    },
    {
        code: 'ig',
        name: 'Asụsụ Igbo',
    },
    {
        code: 'id',
        name: 'Indonesia',
    },
    {
        code: 'ikt',
        name: 'Inuinnaqtun',
    },
    {
        code: 'iu',
        name: 'Inuktitut',
    },
    {
        code: 'iu-Latn',
        name: 'Inuktitut (Latin)',
    },
    {
        code: 'ga',
        name: 'Gaeilge',
    },
    {
        code: 'it',
        name: 'italiano',
    },
    {
        code: 'ja',
        name: '日本語',
    },
    {
        code: 'kn',
        name: 'ಕನ್ನಡ',
    },
    {
        code: 'ks',
        name: 'Kashmiri',
    },
    {
        code: 'kk',
        name: 'қазақ тілі',
    },
    {
        code: 'km',
        name: 'ខ្មែរ',
    },
    {
        code: 'rw',
        name: 'Kinyarwanda',
    },
    {
        code: 'tlh-Latn',
        name: 'Klingon',
    },
    {
        code: 'tlh-Piqd',
        name: 'Klingon (plqaD)',
    },
    {
        code: 'gom',
        name: 'कोंकणी',
    },
    {
        code: 'ko',
        name: '한국어',
    },
    {
        code: 'ku',
        name: 'kurdî',
    },
    {
        code: 'kmr',
        name: 'Kurdish (Northern)',
    },
    {
        code: 'ky',
        name: 'кыргызча',
    },
    {
        code: 'lo',
        name: 'ລາວ',
    },
    {
        code: 'lv',
        name: 'latviešu',
    },
    {
        code: 'lt',
        name: 'lietuvių',
    },
    {
        code: 'ln',
        name: 'lingála',
    },
    {
        code: 'dsb',
        name: 'Lower Sorbian',
    },
    {
        code: 'lug',
        name: 'Luganda',
    },
    {
        code: 'mk',
        name: 'македонски',
    },
    {
        code: 'mai',
        name: 'मैथिली',
    },
    {
        code: 'mg',
        name: 'Malagasy',
    },
    {
        code: 'ms',
        name: 'Melayu',
    },
    {
        code: 'ml',
        name: 'മലയാളം',
    },
    {
        code: 'mt',
        name: 'Malti',
    },
    {
        code: 'mi',
        name: 'Māori',
    },
    {
        code: 'mr',
        name: 'मराठी',
    },
    {
        code: 'mn-Cyrl',
        name: 'Mongolian (Cyrillic)',
    },
    {
        code: 'mn-Mong',
        name: 'Mongolian (Traditional)',
    },
    {
        code: 'my',
        name: 'မြန်မာ',
    },
    {
        code: 'ne',
        name: 'नेपाली',
    },
    {
        code: 'nb',
        name: 'Norwegian',
    },
    {
        code: 'nya',
        name: 'Nyanja',
    },
    {
        code: 'or',
        name: 'ଓଡ଼ିଆ',
    },
    {
        code: 'ps',
        name: 'پښتو',
    },
    {
        code: 'fa',
        name: 'فارسی',
    },
    {
        code: 'pl',
        name: 'polski',
    },
    {
        code: 'pt',
        name: 'português',
    },
    {
        code: 'pt-pt',
        name: 'Portuguese (Portugal)',
    },
    {
        code: 'pa',
        name: 'ਪੰਜਾਬੀ',
    },
    {
        code: 'otq',
        name: 'Queretaro Otomi',
    },
    {
        code: 'ro',
        name: 'română',
    },
    {
        code: 'run',
        name: 'Rundi',
    },
    {
        code: 'ru',
        name: 'русский',
    },
    {
        code: 'sm',
        name: 'Gagana faʻa Sāmoa',
    },
    {
        code: 'sr-Cyrl',
        name: 'Serbian (Cyrillic)',
    },
    {
        code: 'sr-Latn',
        name: 'Serbian (Latin)',
    },
    {
        code: 'st',
        name: 'Sesotho',
    },
    {
        code: 'nso',
        name: 'Sepedi',
    },
    {
        code: 'tn',
        name: 'Setswana',
    },
    {
        code: 'sd',
        name: 'سنڌي',
    },
    {
        code: 'si',
        name: 'සිංහල',
    },
    {
        code: 'sk',
        name: 'slovenčina',
    },
    {
        code: 'sl',
        name: 'slovenščina',
    },
    {
        code: 'so',
        name: 'Soomaali',
    },
    {
        code: 'es',
        name: 'español',
    },
    {
        code: 'sw',
        name: 'Kiswahili',
    },
    {
        code: 'sv',
        name: 'svenska',
    },
    {
        code: 'ty',
        name: 'Tahitian',
    },
    {
        code: 'ta',
        name: 'தமிழ்',
    },
    {
        code: 'tt',
        name: 'татар',
    },
    {
        code: 'te',
        name: 'తెలుగు',
    },
    {
        code: 'th',
        name: 'ไทย',
    },
    {
        code: 'bo',
        name: 'Tibetan',
    },
    {
        code: 'ti',
        name: 'ትግርኛ',
    },
    {
        code: 'to',
        name: 'Tongan',
    },
    {
        code: 'tr',
        name: 'Türkçe',
    },
    {
        code: 'tk',
        name: 'türkmen dili',
    },
    {
        code: 'uk',
        name: 'українська',
    },
    {
        code: 'hsb',
        name: 'Upper Sorbian',
    },
    {
        code: 'ur',
        name: 'اردو',
    },
    {
        code: 'ug',
        name: 'ئۇيغۇرچە',
    },
    {
        code: 'uz',
        name: 'o‘zbek',
    },
    {
        code: 'vi',
        name: 'Tiếng Việt',
    },
    {
        code: 'cy',
        name: 'Cymraeg',
    },
    {
        code: 'xh',
        name: 'isiXhosa',
    },
    {
        code: 'yo',
        name: 'Èdè Yorùbá',
    },
    {
        code: 'yua',
        name: 'Yucatec Maya',
    },
    {
        code: 'zu',
        name: 'isiZulu',
    },
]

// Languages that occur in both Google and Azure
export const languages = _.uniqWith([...languagesGoogle, ...languagesAzure], (pre, cur) => {
    return pre.name == cur.name
})

export const defaultLanguage: ILanguage = { code: 'en', name: 'English' }
