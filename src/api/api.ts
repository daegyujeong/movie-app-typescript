const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

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

// API endpoints
export const api = {
  getPopular: () => 
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  
  getComingSoon: () => 
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  
  getNowPlaying: () => 
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  
  getMovieDetails: (movieId: number) => 
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
};

// Helper functions for image paths
export const getImagePath = (path: string | null, size: string = "original"): string => {
  if (!path) return "/placeholder-poster.jpg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterPath = (path: string | null): string => 
  getImagePath(path, "w500");

export const getBackdropPath = (path: string | null): string => 
  getImagePath(path, "w1280");

export default api;