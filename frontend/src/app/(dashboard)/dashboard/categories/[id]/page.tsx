import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import CategoryDetailsPage from "@/features/dashboard/components/categories/CategoryDetailsPage";

type CategoryDetailsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryDetailsRoute({
  params,
}: CategoryDetailsRouteProps) {
  const { id } = await params;

  return (
    <DashboardContainer>
      <CategoryDetailsPage categoryId={id} />
    </DashboardContainer>
  );
}
