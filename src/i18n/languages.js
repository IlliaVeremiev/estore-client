const defaultLanguageCode = import.meta.env.VITE_DEFAULT_LANGUAGE;

export const languages = [
    {
        name: 'English',
        languageCode: 'en',
        countryCode: 'us',
        code: 'en'
    },
    {
        name: 'Русский',
        languageCode: 'ru',
        countryCode: 'ru',
        code: 'ru'
    },
    {
        name: 'Українська',
        languageCode: 'uk',
        countryCode: 'ua',
        code: 'uk'
    }
];

export function getLanguage(code) {
    let response = languages.find(language => language.code === code);
    if (response != null) return response;

    code = code?.toLowerCase() ?? '';
    response = languages.find(language => language.languageCode === code);
    if (response != null) return response;

    return languages.find(language => language.languageCode === defaultLanguageCode);
}
