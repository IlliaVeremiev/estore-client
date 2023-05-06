import { createI18n } from 'vue-i18n'
import { messages } from './dictionary'
import { getLanguage } from './languages'

const selectedLanguage = localStorage.getItem('language') || (navigator.language || navigator.userLanguage).split('-')[0];

export default createI18n({
    legacy: false,
    fallbackLocale: 'uk',
    messages,
    locale: selectedLanguage
})