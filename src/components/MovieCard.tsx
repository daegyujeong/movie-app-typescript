import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Movie, makeImagePath } from "../api/api";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const Card = styled(motion.div)`
  position: relative;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.medium};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
`;

const Rating = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
`;

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <Card
      layoutId={`movie-${movie.id}`}
      onClick={onClick}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Poster
        src={makeImagePath(movie.poster_path)}
        alt={movie.title}
      />
      <Info>
        <Title>{movie.title}</Title>
        <Rating>★ {movie.vote_average.toFixed(1)}</Rating>
      </Info>
    </Card>
  );
};

export default MovieCard;