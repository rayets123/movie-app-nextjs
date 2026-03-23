'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { localeToTmdbLanguage } from '@/i18n/routing';
import MoviesList from '@/components/MoviesList';
import { useMovieStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('home');
  const language = localeToTmdbLanguage[locale] ?? 'ru-RU';
  const hydratedRef = useRef(false);

  const queryPage = useMemo(() => {
    const page = Number(searchParams.get('page') ?? '1');
    return Number.isFinite(page) && page > 0 ? page : 1;
  }, [searchParams]);

  const queryGenre = useMemo(() => {
    const rawGenre = searchParams.get('genre');
    if (!rawGenre) return null;
    const parsed = Number(rawGenre);
    return Number.isFinite(parsed) ? parsed : null;
  }, [searchParams]);

  const {
    currentPage,
    selectedGenre,
    hydrateFromQuery,
    fetchGenres,
    fetchMovies,
  } = useMovieStore();

  useEffect(() => {
    hydrateFromQuery(queryPage, queryGenre);
    hydratedRef.current = true;
  }, [queryPage, queryGenre, hydrateFromQuery]);

  useEffect(() => {
    fetchGenres(language);
  }, [fetchGenres, language]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    fetchMovies(language);
  }, [currentPage, selectedGenre, fetchMovies, language]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    if (selectedGenre) params.set('genre', selectedGenre.toString());
    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (nextQuery !== currentQuery) {
      router.push(`/?${nextQuery}`);
    }
  }, [currentPage, selectedGenre, router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('title')}</h1>
        <MoviesList />
      </div>
    </div>
  );
}
