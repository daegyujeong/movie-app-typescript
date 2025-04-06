# MovieFlex - React Movie App

A modern, responsive movie browsing application built with React, TypeScript, React Router, React Query, Styled Components, and Framer Motion.

## Features

- Browse popular movies, upcoming releases, and now playing films
- Smooth animations and transitions using Framer Motion
- Detailed movie information modal with additional data
- Responsive design that works on mobile, tablet, and desktop
- Data fetching with React Query for efficient caching and state management
- Clean, TypeScript-based codebase for better type safety and development experience

## Project Structure

```
src/
  ├── api/
  │   └── api.ts           // API endpoints and TypeScript types
  ├── components/
  │   ├── Header.tsx       // Navigation header
  │   ├── MovieCard.tsx    // Individual movie card component
  │   ├── MovieList.tsx    // Grid of movie cards
  │   ├── MovieModal.tsx   // Modal for movie details
  │   └── Loader.tsx       // Loading indicator
  ├── pages/
  │   ├── Home.tsx         // Popular movies page
  │   ├── ComingSoon.tsx   // Coming Soon page
  │   └── NowPlaying.tsx   // Now Playing page
  ├── hooks/
  │   ├── useMovies.ts     // Custom hook for fetching movies
  │   └── useMovieDetails.ts // Custom hook for fetching movie details
  ├── styles/
  │   ├── GlobalStyle.tsx  // Global styles
  │   └── theme.ts         // Theme configuration
  ├── utils/
  │   └── helpers.ts       // Helper functions
  ├── App.tsx              // Main App component
  ├── router.tsx           // Router configuration
  ├── index.tsx            // Entry point
  └── types.ts             // Type definitions
```

## Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

## Credits

- Movie data provided by [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
- Icons from [Heroicons](https://heroicons.dev/?iconset=v2-20-solid)
