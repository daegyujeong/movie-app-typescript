// Format date to a readable format
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}...`;
};

// Get year from date string
export const getYearFromDate = (dateString: string): string => {
  return new Date(dateString).getFullYear().toString();
};

// Calculate average color from vote average (for visualizing ratings)
export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return '#4CAF50'; // Green
  if (rating >= 6) return '#FFC107'; // Yellow
  if (rating >= 4) return '#FF9800'; // Orange
  return '#F44336'; // Red
};