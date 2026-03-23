'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
  ru: 'RU',
  en: 'EN',
  es: 'ES',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`px-2.5 py-1 rounded text-sm font-medium transition-colors ${
            locale === l
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
