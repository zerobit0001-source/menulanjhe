import { getDashboardCategoryStyle } from "@/features/dashboard/components/dashboardCategoryConfig";
import { DashboardCategory } from "@/features/dashboard/types/dasboars.types";

export type DashboardCategoryViewModel = {
  id: string;
  title: string;
  product_count: number;
  style: {
    backgroundColor: string;
    textColor: string;
    icon: string;
  };
};

export function mapDashboardCategory(
  category: DashboardCategory,
): DashboardCategoryViewModel {
  const style = getDashboardCategoryStyle(category.icon_name);

  return {
    id: category.id,
    title: category.name,
    product_count: category.product_count,
    style,
  };
}
