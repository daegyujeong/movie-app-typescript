import { useQuery } from "react-query";
import { getMovie, Movie } from "../api/api";

const useMovieDetails = (movieId: number, enabled: boolean = true) => {
  return useQuery<Movie>(
    ["movieDetails", movieId],
    () => getMovie(movieId),
    {
      enabled,
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
};

export default useMovieDetails;