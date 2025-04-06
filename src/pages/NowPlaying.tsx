import React from "react";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import useMovies from "../hooks/useMovies";

const NowPlaying: React.FC = () => {
  const { data, isLoading, isError } = useMovies("nowPlaying");

  if (isLoading && !data) {
    return <Loader />;
  }

  return (
    <MovieList
      title="Now Playing"
      movies={data?.results || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default NowPlaying;