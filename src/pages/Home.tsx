import React from "react";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import useMovies from "../hooks/useMovies";

const Home: React.FC = () => {
  const { data, isLoading, isError } = useMovies("popular");

  if (isLoading && !data) {
    return <Loader />;
  }

  return (
    <MovieList
      title="Popular Movies"
      movies={data?.results || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default Home;