/**
 * Theme configuration
 * Pastel colour palette for doit
 */

export const theme = {
  colors: {
    primary: "#FFB3D9", // Soft pink for primary actions
    success: "#A8D5BA", // Soft mint for completed
    warning: "#FFD4A3", // Soft peach for deadline warning (≤3 days)
    background: "#F8F8F8", // Off-white for page background
    text: "#333333", // Dark gray for text
    textLight: "#999999", // Light gray for secondary text
  },
  bgGradients: {
    activeGoals: "from-pink-50 to-purple-50",
    completedGoals: "from-green-50 to-teal-50",
    highlightGoal: "bg-orange-100",
  },
};
