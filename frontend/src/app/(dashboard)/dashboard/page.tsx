import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { DashboardPageCategories } from "@/features/dashboard/sections/DashboardPageCategories";
import DashboardPageMenu from "@/features/dashboard/sections/DashboardPageMenu";

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardPageCategories />
      <DashboardPageMenu />
    </DashboardContainer>
  );
}
