import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { DashboardPageCategories } from "@/features/dashboard/sections/DashboardPageCategories";

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardPageCategories />
      <p>Welcome to the Dashboard!</p>
    </DashboardContainer>
  );
}
