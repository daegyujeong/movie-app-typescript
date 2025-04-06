import { useQuery } from "react-query";
import { api, Movie } from "../api/api";

const useMovieDetails = (movieId: number, enabled: boolean = true) => {
  return useQuery<Movie>(
    ["movieDetails", movieId],
    async () => {
      const response = await fetch(api.getMovieDetails(movieId));
      if (!response.ok) {
        throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
      }
      return response.json();
    },
    {
      enabled,
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
};

export default useMovieDetails;