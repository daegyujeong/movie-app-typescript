import { useQuery } from "react-query";
import { api, MovieResponse } from "../api/api";

type MovieCategory = "popular" | "upcoming" | "nowPlaying";

const getApiEndpoint = (category: MovieCategory) => {
  switch (category) {
    case "popular":
      return api.getPopular();
    case "upcoming":
      return api.getComingSoon();
    case "nowPlaying":
      return api.getNowPlaying();
    default:
      return api.getPopular();
  }
};

const useMovies = (category: MovieCategory) => {
  const queryKey = `${category}Movies`;
  
  return useQuery<MovieResponse>(
    queryKey,
    async () => {
      const response = await fetch(getApiEndpoint(category));
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} movies`);
      }
      return response.json();
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );
};

export default useMovies;