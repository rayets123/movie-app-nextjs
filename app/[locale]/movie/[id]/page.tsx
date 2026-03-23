import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getMovieDetails, getImageUrl } from '@/lib/tmdb';
import { localeToTmdbLanguage } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';

interface MoviePageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { locale, id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) notFound();

  const language = localeToTmdbLanguage[locale] ?? 'ru-RU';
  const t = await getTranslations({ locale, namespace: 'moviePage' });

  let movie;
  try {
    movie = await getMovieDetails(movieId, language);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {movie.backdrop_path && (
        <div className="relative h-[60vh] w-full overflow-hidden">
          <Image
            src={getImageUrl(movie.backdrop_path, 'w1280')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('backToList')}
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-full max-w-[300px] aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-gray-200">
              {movie.poster_path ? (
                <Image
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-sm">({movie.vote_count} {t('ratings')})</span>
              </div>
              <span>•</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              {movie.runtime > 0 && (
                <>
                  <span>•</span>
                  <span>{movie.runtime} {t('minutes')}</span>
                </>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">{t('description')}</h2>
              <p className="text-gray-700 leading-relaxed">{movie.overview || t('noDescription')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {movie.budget > 0 && (
                <div>
                  <span className="text-gray-600">{t('budget')}: </span>
                  <span className="font-semibold">${movie.budget.toLocaleString()}</span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <span className="text-gray-600">{t('revenue')}: </span>
                  <span className="font-semibold">${movie.revenue.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {movie.images && (movie.images.backdrops.length > 0 || movie.images.posters.length > 0) && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('gallery')}</h2>

            {movie.images.backdrops.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('backdrops')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movie.images.backdrops.slice(0, 8).map((backdrop, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <Image
                        src={getImageUrl(backdrop.file_path, 'w500')}
                        alt={t('frameAlt', { title: movie.title, index: index + 1 })}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.images.posters.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('posters')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movie.images.posters.slice(0, 6).map((poster, index) => (
                    <div key={index} className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <Image
                        src={getImageUrl(poster.file_path, 'w500')}
                        alt={t('posterAlt', { title: movie.title, index: index + 1 })}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
