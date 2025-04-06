import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Movie, getPosterPath } from "../api/api";
import { getRatingColor } from "../utils/helpers";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const Card = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const PosterContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 2/3;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Title = styled.h3`
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Rating = styled.div<{ rating: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ rating }) => getRatingColor(rating)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ReleaseYear = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

// Card animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 20 
    }
  },
  hover: { 
    y: -10,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  }
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : null;

  return (
    <Card
      layoutId={`movie-${movie.id}`}
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300 }}
    >
      <PosterContainer>
        <Poster 
          src={getPosterPath(movie.poster_path)} 
          alt={movie.title} 
          loading="lazy"
        />
        <Rating rating={movie.vote_average}>
          {movie.vote_average.toFixed(1)}
        </Rating>
        {releaseYear && <ReleaseYear>{releaseYear}</ReleaseYear>}
      </PosterContainer>
      <Title>{movie.title}</Title>
    </Card>
  );
};

export default MovieCard;