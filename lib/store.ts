import { create } from 'zustand';
import { getGenres, getPopularMovies, Genre, Movie } from '@/lib/tmdb';

interface MovieStore {
  movies: Movie[];
  genres: Genre[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchGenres: (language?: string) => Promise<void>;
  fetchMovies: (page: number, genreId: number | null, language?: string) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  genres: [],
  totalPages: 1,
  loading: false,
  error: null,
  fetchGenres: async (language = 'ru-RU') => {
    try {
      const data = await getGenres(language);
      set({ genres: data.genres });
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  },
  fetchMovies: async (page, genreId, language = 'ru-RU') => {
    set({ loading: true, error: null });
    try {
      const data = await getPopularMovies(page, genreId ?? undefined, language);
      set({ movies: data.results, totalPages: data.total_pages, loading: false });
    } catch (error) {
      console.error('Error loading movies:', error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load movies',
      });
    }
  },
}));
