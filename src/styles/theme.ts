export const theme = {
  colors: {
    background: "#000000",
    text: "#ffffff",
    primary: "#ff0000",
    secondary: "#333333",
    overlay: "rgba(0, 0, 0, 0.75)"
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xlarge: "1.5rem",
    xxlarge: "2rem"
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px"
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
    xlarge: "2rem",
    xxlarge: "3rem"
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "992px",
    largeDesktop: "1200px"
  }
};

export type Theme = typeof theme;

export default theme;