import { create } from 'zustand';
import { getGenres, getPopularMovies, Genre, Movie } from '@/lib/tmdb';

interface MovieStore {
  movies: Movie[];
  genres: Genre[];
  currentPage: number;
  totalPages: number;
  selectedGenre: number | null;
  loading: boolean;
  error: string | null;
  hydrateFromQuery: (page: number, genreId: number | null) => void;
  setPage: (page: number) => void;
  setGenre: (genreId: number | null) => void;
  fetchGenres: (language?: string) => Promise<void>;
  fetchMovies: (language?: string) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  movies: [],
  genres: [],
  currentPage: 1,
  totalPages: 1,
  selectedGenre: null,
  loading: false,
  error: null,
  hydrateFromQuery: (page, genreId) => {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    set({
      currentPage: safePage,
      selectedGenre: genreId,
    });
  },
  setPage: (page) => set({ currentPage: page }),
  setGenre: (genreId) => set({ selectedGenre: genreId, currentPage: 1 }),
  fetchGenres: async (language = 'ru-RU') => {
    try {
      const data = await getGenres(language);
      set({ genres: data.genres });
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  },
  fetchMovies: async (language = 'ru-RU') => {
    set({ loading: true, error: null });
    try {
      const { currentPage, selectedGenre } = get();
      const data = await getPopularMovies(currentPage, selectedGenre ?? undefined, language);
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
