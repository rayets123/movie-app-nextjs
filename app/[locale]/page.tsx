'use client';

import { useEffect, useMemo } from 'react';
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

  // URL — єдине джерело правди для page і genre
  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page') ?? '1');
    return Number.isFinite(page) && page > 0 ? page : 1;
  }, [searchParams]);

  const selectedGenre = useMemo(() => {
    const raw = searchParams.get('genre');
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }, [searchParams]);

  const { fetchGenres, fetchMovies, totalPages } = useMovieStore();

  useEffect(() => {
    fetchGenres(language);
  }, [fetchGenres, language]);

  useEffect(() => {
    fetchMovies(currentPage, selectedGenre, language);
  }, [currentPage, selectedGenre, fetchMovies, language]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (selectedGenre) params.set('genre', selectedGenre.toString());
    router.push(`/?${params.toString()}`);
  };

  const handleGenreChange = (genreId: number | null) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (genreId) params.set('genre', genreId.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('title')}</h1>
        <MoviesList
          currentPage={currentPage}
          totalPages={totalPages}
          selectedGenre={selectedGenre}
          onPageChange={handlePageChange}
          onGenreChange={handleGenreChange}
        />
      </div>
    </div>
  );
}
