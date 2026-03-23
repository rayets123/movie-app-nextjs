import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'en', 'es'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed', // ru без префікса, en/es з префіксом
});

export const localeToTmdbLanguage: Record<string, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  es: 'es-ES',
};
