import React from "react";
import styled from "styled-components";
import { motion, HTMLMotionProps } from "framer-motion";
import { Movie, makeImagePath, makeBgPath } from "../api/api";
import useMovieDetails from "../hooks/useMovieDetails";
import { formatCurrency, formatRuntime, getRatingColor } from "../utils/helpers";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: 100;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.large};
  padding-top: 80px;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xxlarge};
`;

const CloseButton = styled(motion.button) <HTMLMotionProps<"button">>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.medium};
  right: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.overlay};
  color: ${({ theme }) => theme.colors.text};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSizes.large};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Backdrop = styled.div`
  position: relative;
  height: 300px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Overview = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text}80;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 600;
`;

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const { data: fullMovieDetails, isLoading } = useMovieDetails(movie.id);

  // Ensure we have data to display even while loading
  const movieData = fullMovieDetails || movie;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.1
      }
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <Overlay
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <ModalContainer
        layoutId={`movie-${movie.id}`}
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
      >
        <CloseButton
          onClick={onClose}
          whileHover={{ backgroundColor: "rgba(255, 0, 0, 0.8)", scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </CloseButton>

        <Backdrop>
          <BackdropImage
            src={makeBgPath(movieData.backdrop_path)}
            alt={movieData.title}
          />
        </Backdrop>

        <Content as={motion.div} variants={contentVariants}>
          <Title as={motion.h1} variants={itemVariants}>
            {movieData.title}
          </Title>

          <Overview as={motion.p} variants={itemVariants}>
            {movieData.overview}
          </Overview>

          <InfoGrid as={motion.div} variants={itemVariants}>
            <InfoItem as={motion.div} variants={itemVariants}>
              <InfoLabel>Release Date</InfoLabel>
              <InfoValue>
                {new Date(movieData.release_date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </InfoValue>
            </InfoItem>

            <InfoItem as={motion.div} variants={itemVariants}>
              <InfoLabel>Rating</InfoLabel>
              <InfoValue
                style={{ color: getRatingColor(movieData.vote_average) }}
              >
                {movieData.vote_average.toFixed(1)} / 10
              </InfoValue>
            </InfoItem>

            {!isLoading && fullMovieDetails && (
              <>
                {fullMovieDetails.runtime && (
                  <InfoItem as={motion.div} variants={itemVariants}>
                    <InfoLabel>Runtime</InfoLabel>
                    <InfoValue>{formatRuntime(fullMovieDetails.runtime)}</InfoValue>
                  </InfoItem>
                )}

                {fullMovieDetails.budget && fullMovieDetails.budget > 0 && (
                  <InfoItem as={motion.div} variants={itemVariants}>
                    <InfoLabel>Budget</InfoLabel>
                    <InfoValue>{formatCurrency(fullMovieDetails.budget)}</InfoValue>
                  </InfoItem>
                )}

                {fullMovieDetails.revenue && fullMovieDetails.revenue > 0 && (
                  <InfoItem as={motion.div} variants={itemVariants}>
                    <InfoLabel>Revenue</InfoLabel>
                    <InfoValue>{formatCurrency(fullMovieDetails.revenue)}</InfoValue>
                  </InfoItem>
                )}

                {fullMovieDetails.genres && fullMovieDetails.genres.length > 0 && (
                  <InfoItem as={motion.div} variants={itemVariants}>
                    <InfoLabel>Genres</InfoLabel>
                    <InfoValue>
                      {fullMovieDetails.genres.map((genre) => genre.name).join(', ')}
                    </InfoValue>
                  </InfoItem>
                )}

                {fullMovieDetails.homepage && (
                  <InfoItem as={motion.div} variants={itemVariants}>
                    <InfoLabel>Homepage</InfoLabel>
                    <InfoValue>
                      <motion.a
                        href={fullMovieDetails.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ color: "#ff0000" }}
                      >
                        Visit Website
                      </motion.a>
                    </InfoValue>
                  </InfoItem>
                )}
              </>
            )}
          </InfoGrid>
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

export default MovieModal;