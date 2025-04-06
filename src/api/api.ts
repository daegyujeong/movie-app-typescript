// API Types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export interface MovieDetails extends Movie {
  runtime?: number;
  budget?: number;
  revenue?: number;
  genres?: Array<{ id: number; name: string; }>;
  homepage?: string;
}

// API Constants
const BASE_URL = 'https://movies-api.nomadcoders.workers.dev';

// API Endpoints
export async function getPopular(): Promise<{ results: Movie[] }> {
  const response = await fetch(`${BASE_URL}/popular`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return response.json();
}

export async function getNowPlaying(): Promise<{ results: Movie[] }> {
  const response = await fetch(`${BASE_URL}/now-playing`);
  if (!response.ok) {
    throw new Error('Failed to fetch now playing movies');
  }
  return response.json();
}

export async function getComingSoon(): Promise<{ results: Movie[] }> {
  const response = await fetch(`${BASE_URL}/coming-soon`);
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  return response.json();
}

export async function getMovie(id: number): Promise<MovieDetails> {
  const response = await fetch(`${BASE_URL}/movie?id=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie with id: ${id}`);
  }
  return response.json();
}

// Image URL Helpers
export function makeImagePath(path: string | null): string {
  if (!path) {
    return '/placeholder-poster.jpg';
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function makeBgPath(path: string | null): string {
  if (!path) {
    return '/placeholder-backdrop.jpg';
  }
  return `https://image.tmdb.org/t/p/original${path}`;
}

// Legacy API object for backward compatibility with existing code
export const api = {
  getPopular: () => `${BASE_URL}/popular`,
  getComingSoon: () => `${BASE_URL}/coming-soon`,
  getNowPlaying: () => `${BASE_URL}/now-playing`,
  getMovieDetails: (movieId: number) => `${BASE_URL}/movie?id=${movieId}`,
};

// Legacy helper functions with new naming aliases
export const getPosterPath = makeImagePath;
export const getBackdropPath = makeBgPath;

export default {
  getPopular,
  getNowPlaying,
  getComingSoon,
  getMovie,
  makeImagePath,
  makeBgPath
};