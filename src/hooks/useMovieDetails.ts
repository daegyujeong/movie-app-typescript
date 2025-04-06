import { useQuery } from '@tanstack/react-query';
import { getMovie, MovieDetails } from '../api/api';

export default function useMovieDetails(movieId: number) {
  return useQuery<MovieDetails, Error>({
    queryKey: ['movie', movieId],
    queryFn: () => getMovie(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });
}