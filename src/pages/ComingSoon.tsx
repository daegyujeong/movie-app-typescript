import React from "react";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import useMovies from "../hooks/useMovies";

const ComingSoon: React.FC = () => {
  const { data, isLoading, isError } = useMovies("upcoming");

  if (isLoading && !data) {
    return <Loader />;
  }

  return (
    <MovieList
      title="Coming Soon"
      movies={data?.results || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default ComingSoon;