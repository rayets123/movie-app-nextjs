'use client';

import { useTranslations } from 'next-intl';
import { useMovieStore } from '@/lib/store';
import MovieCard from '@/components/MovieCard';
import GenreFilter from '@/components/GenreFilter';
import Pagination from '@/components/Pagination';

interface MoviesListProps {
  currentPage: number;
  totalPages: number;
  selectedGenre: number | null;
  onPageChange: (page: number) => void;
  onGenreChange: (genreId: number | null) => void;
}

export default function MoviesList({
  currentPage,
  totalPages,
  selectedGenre,
  onPageChange,
  onGenreChange,
}: MoviesListProps) {
  const t = useTranslations('moviesList');
  const { movies, genres, loading, error } = useMovieStore();

  return (
    <>
      {genres.length > 0 && (
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={onGenreChange}
        />
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-600">
          <p>{t('loading')}</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">
          <p>{error}</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p>{t('notFound')}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </>
  );
}
