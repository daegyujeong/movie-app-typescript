import { useQuery } from "react-query";
import { getPopular, getComingSoon, getNowPlaying, MovieResponse } from "../api/api";

type MovieCategory = "popular" | "upcoming" | "nowPlaying";

const useMovies = (category: MovieCategory) => {
  const queryKey = `${category}Movies`;
  
  const fetchMovies = async (): Promise<MovieResponse> => {
    switch (category) {
      case "popular":
        return getPopular();
      case "upcoming":
        return getComingSoon();
      case "nowPlaying":
        return getNowPlaying();
      default:
        return getPopular();
    }
  };
  
  return useQuery<MovieResponse>(
    queryKey,
    fetchMovies,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};

export default useMovies;