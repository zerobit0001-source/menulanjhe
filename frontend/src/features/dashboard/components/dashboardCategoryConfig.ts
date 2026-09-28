export type DashboardCategoryStyle = {
  backgroundColor: string;
  textColor: string;
  icon: string;
};

export const dashboardCategoryConfig: Record<string, DashboardCategoryStyle> = {
  utensils: {
    backgroundColor: "#4B5563",
    textColor: "#FFFFFF",
    icon: "utensils",
  },

  pizza: {
    backgroundColor: "#F59E0B",
    textColor: "#FFFFFF",
    icon: "pizza",
  },

  burger: {
    backgroundColor: "#10B981",
    textColor: "#FFFFFF",
    icon: "burger",
  },

  coffee: {
    backgroundColor: "#3B82F6",
    textColor: "#FFFFFF",
    icon: "coffee",
  },

  drink: {
    backgroundColor: "#3B82F6",
    textColor: "#FFFFFF",
    icon: "drink",
  },

  dessert: {
    backgroundColor: "#EF4444",
    textColor: "#FFFFFF",
    icon: "dessert",
  },

  salad: {
    backgroundColor: "#10B981",
    textColor: "#FFFFFF",
    icon: "salad",
  },

  leaf: {
    backgroundColor: "#10B981",
    textColor: "#FFFFFF",
    icon: "leaf",
  },

  drumstick: {
    backgroundColor: "#F59E0B",
    textColor: "#FFFFFF",
    icon: "drumstick",
  },

  egg: {
    backgroundColor: "#F59E0B",
    textColor: "#FFFFFF",
    icon: "egg",
  },

  star: {
    backgroundColor: "#8B5CF6",
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
