import { Movie } from "./api/api";

// Route paths type
export type RoutePath = "/" | "/coming-soon" | "/now-playing";

// Navigation item type
export interface NavItem {
  path: RoutePath;
  label: string;
}

// Props for styled components with theme
export interface ThemeProps {
  theme: {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      overlay: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      largeDesktop: string;
    };
  }
}

// Movie context state
export interface MovieContextState {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}