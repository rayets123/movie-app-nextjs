'use client';

import { useTranslations } from 'next-intl';
import { Genre } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

export default function GenreFilter({ genres, selectedGenre, onGenreChange }: GenreFilterProps) {
  const t = useTranslations('genreFilter');

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        onClick={() => onGenreChange(null)}
        variant={selectedGenre === null ? 'default' : 'secondary'}
        size="sm"
        className="rounded-full"
      >
        {t('all')}
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          variant={selectedGenre === genre.id ? 'default' : 'secondary'}
          size="sm"
          className="rounded-full"
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}
