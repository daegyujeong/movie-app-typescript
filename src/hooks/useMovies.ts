import { useQuery } from "@tanstack/react-query";
import { getPopular, getComingSoon, getNowPlaying, Movie } from "../api/api";

type MovieCategory = "popular" | "upcoming" | "nowPlaying";

interface MovieQueryResult {
  results: Movie[];
}

export default function useMovies(category: MovieCategory) {
  const getMoviesByCategory = () => {
    switch (category) {
      case "popular":
        return getPopular();
      case "upcoming":
        return getComingSoon();
      case "nowPlaying":
        return getNowPlaying();
      default:
        throw new Error(`Invalid category: ${category}`);
    }
  };

  return useQuery<MovieQueryResult, Error>({
    queryKey: ["movies", category],
    queryFn: getMoviesByCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}