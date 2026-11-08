export type DashboardCategoryStyle = {
  backgroundColor: string;
  textColor: string;
  icon: string;
};

export const dashboardCategoryConfig: Record<string, DashboardCategoryStyle> = {
  // General
  utensils: {
    backgroundColor: "#475569",
    textColor: "#FFFFFF",
    icon: "utensils",
  },

  // Food
  pizza: {
    backgroundColor: "#D97706",
    textColor: "#FFFFFF",
    icon: "pizza",
  },

  burger: {
    backgroundColor: "#92400E",
    textColor: "#FFFFFF",
    icon: "burger",
  },

  sandwich: {
    backgroundColor: "#A16207",
    textColor: "#FFFFFF",
    icon: "sandwich",
  },

  pasta: {
    backgroundColor: "#C2410C",
    textColor: "#FFFFFF",
    icon: "utensils",
  },

  chicken: {
    backgroundColor: "#B45309",
    textColor: "#FFFFFF",
    icon: "drumstick",
  },

  meat: {
    backgroundColor: "#991B1B",
    textColor: "#FFFFFF",
    icon: "beef",
  },

  seafood: {
    backgroundColor: "#0369A1",
    textColor: "#FFFFFF",
    icon: "fish",
  },

  fish: {
    backgroundColor: "#0284C7",
    textColor: "#FFFFFF",
    icon: "fish",
  },

  rice: {
    backgroundColor: "#A16207",
    textColor: "#FFFFFF",
    icon: "cooking-pot",
  },

  salad: {
    backgroundColor: "#16A34A",
    textColor: "#FFFFFF",
    icon: "salad",
  },

  appetizer: {
    backgroundColor: "#CA8A04",
    textColor: "#FFFFFF",
    icon: "utensils",
  },

  side: {
    backgroundColor: "#65A30D",
    textColor: "#FFFFFF",
    icon: "utensils",
  },

  // Drinks
  coffee: {
    backgroundColor: "#78350F",
    textColor: "#FFFFFF",
    icon: "coffee",
  },

  tea: {
    backgroundColor: "#854D0E",
    textColor: "#FFFFFF",
    icon: "coffee",
  },

  drink: {
    backgroundColor: "#0284C7",
    textColor: "#FFFFFF",
    icon: "glass-water",
  },

  juice: {
    backgroundColor: "#EA580C",
    textColor: "#FFFFFF",
    icon: "glass-water",
  },

  smoothie: {
    backgroundColor: "#DB2777",
    textColor: "#FFFFFF",
    icon: "blender",
  },

  milkshake: {
    backgroundColor: "#DB2777",
    textColor: "#FFFFFF",
    icon: "glass-water",
  },

  // Cafe & Breakfast
  breakfast: {
    backgroundColor: "#D97706",
    textColor: "#FFFFFF",
    icon: "egg",
  },

  egg: {
    backgroundColor: "#CA8A04",
    textColor: "#FFFFFF",
    icon: "egg",
  },

  bakery: {
    backgroundColor: "#B45309",
    textColor: "#FFFFFF",
    icon: "wheat",
  },

  bread: {
    backgroundColor: "#A16207",
    textColor: "#FFFFFF",
    icon: "wheat",
  },

  // Desserts
  dessert: {
    backgroundColor: "#DB2777",
    textColor: "#FFFFFF",
    icon: "cake-slice",
  },

  cake: {
    backgroundColor: "#BE185D",
    textColor: "#FFFFFF",
    icon: "cake-slice",
  },

  icecream: {
    backgroundColor: "#C026D3",
    textColor: "#FFFFFF",
    icon: "ice-cream",
  },

  chocolate: {
    backgroundColor: "#713F12",
    textColor: "#FFFFFF",
    icon: "candy",
  },

  // Special categories
  leaf: {
    backgroundColor: "#15803D",
    textColor: "#FFFFFF",
    icon: "leaf",
  },

  vegan: {
    backgroundColor: "#166534",
    textColor: "#FFFFFF",
    icon: "sprout",
  },

  healthy: {
    backgroundColor: "#0F766E",
    textColor: "#FFFFFF",
    icon: "heart-pulse",
  },

  kids: {
    backgroundColor: "#7C3AED",
    textColor: "#FFFFFF",
    icon: "baby",
  },

  sauce: {
    backgroundColor: "#DC2626",
    textColor: "#FFFFFF",
    icon: "bottle-wine",
  },

  snack: {
    backgroundColor: "#C2410C",
    textColor: "#FFFFFF",
    icon: "popcorn",
  },

  combo: {
    backgroundColor: "#7C3AED",
    textColor: "#FFFFFF",
    icon: "package",
  },

  special: {
    backgroundColor: "#7C3AED",
    textColor: "#FFFFFF",
    icon: "star",
  },

  iranian: {
    backgroundColor: "#0F766E",
    textColor: "#FFFFFF",
    icon: "cooking-pot",
  },

  asian: {
    backgroundColor: "#BE123C",
    textColor: "#FFFFFF",
    icon: "soup",
  },

  italian: {
    backgroundColor: "#15803D",
    textColor: "#FFFFFF",
    icon: "utensils",
  },

  // Fallback
  star: {
    backgroundColor: "#7C3AED",
    textColor: "#FFFFFF",
    icon: "star",
  },
};

export const defaultDashboardCategoryStyle: DashboardCategoryStyle = {
  backgroundColor: "#4B5563",
  textColor: "#FFFFFF",
  icon: "category",
};

export function getDashboardCategoryStyle(
  iconName?: string | null,
): DashboardCategoryStyle {
  if (!iconName) {
    return defaultDashboardCategoryStyle;
  }

  return dashboardCategoryConfig[iconName] ?? defaultDashboardCategoryStyle;
}
