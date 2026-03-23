import Image from 'next/image';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { Link } from '@/i18n/navigation';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-[2/3] mb-3">
        {movie.poster_path ? (
          <Image
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {movie.title}
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>{new Date(movie.release_date).getFullYear()}</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
