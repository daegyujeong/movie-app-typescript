const BASE_URL = 'https://movies-api.nomadcoders.workers.dev';

// Movie types
export interface Movie {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  budget?: number;
  revenue?: number;
  homepage?: string;
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// API functions - Using the Nomad Coders format
export function getPopular() {
  return fetch(`${BASE_URL}/popular`).then((r) => r.json());
}

export function getNowPlaying() {
  return fetch(`${BASE_URL}/now-playing`).then((r) => r.json());
}

export function getComingSoon() {
  return fetch(`${BASE_URL}/coming-soon`).then((r) => r.json());
}

export function getMovie(id: number) {
  return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

// Image path helper functions
export function makeImagePath(image: string | null) {
  if (!image) return '/placeholder-poster.jpg';
  return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image: string | null) {
  if (!image) return '/placeholder-backdrop.jpg';
  return `https://image.tmdb.org/t/p/original${image}`;
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