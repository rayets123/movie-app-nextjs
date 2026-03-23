const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  images: {
    backdrops: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
    posters: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

async function fetchFromTMDB<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  if (!API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getPopularMovies(page: number = 1, genreId?: number, language = 'ru-RU'): Promise<MoviesResponse> {
  const params: Record<string, string> = {
    page: page.toString(),
    language,
  };

  if (genreId) {
    params.with_genres = genreId.toString();
    params.sort_by = 'popularity.desc';
    return fetchFromTMDB<MoviesResponse>('/discover/movie', params);
  }

  return fetchFromTMDB<MoviesResponse>('/movie/popular', params);
}

export async function getMovieDetails(movieId: number, language = 'ru-RU'): Promise<MovieDetails> {
  const [movie, images] = await Promise.all([
    fetchFromTMDB<MovieDetails>(`/movie/${movieId}`, { language }),
    fetchFromTMDB<{ backdrops: any[]; posters: any[] }>(`/movie/${movieId}/images`),
  ]);

  return {
    ...movie,
    images,
  };
}

export async function getGenres(language = 'ru-RU'): Promise<GenresResponse> {
  return fetchFromTMDB<GenresResponse>('/genre/movie/list', { language });
}

export function getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string {
  if (!path) {
    return '';
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
