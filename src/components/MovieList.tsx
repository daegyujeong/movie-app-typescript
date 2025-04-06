import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "../api/api";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import Loader from "./Loader";

interface MovieListProps {
  title: string;
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
}

const Container = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xxlarge} ${({ theme }) => theme.spacing.large};
  margin-top: 60px;
  min-height: 100vh;
`;

const Title = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    transform-origin: left;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xxlarge};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: 0 auto;
  max-width: 600px;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  gap: ${({ theme }) => theme.spacing.large};
`;

const LoadingMessage = styled(motion.div)`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.text};
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const titleLineVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const MovieList: React.FC<MovieListProps> = ({ title, movies, isLoading, isError }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Title
        variants={titleVariants}
      >
        {title}
      </Title>

      {isLoading && (
        <LoadingContainer>
          <Loader />
          <LoadingMessage>Loading amazing movies...</LoadingMessage>
        </LoadingContainer>
      )}

      {isError && (
        <ErrorMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Error loading movies. Please try again later.
        </ErrorMessage>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <Grid
          variants={gridVariants}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => openModal(movie)} 
            />
          ))}
        </Grid>
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <ErrorMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          No movies found. Please try again later.
        </ErrorMessage>
      )}

      <AnimatePresence>
        {selectedMovie && (
          <MovieModal 
            movie={selectedMovie} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default MovieList;