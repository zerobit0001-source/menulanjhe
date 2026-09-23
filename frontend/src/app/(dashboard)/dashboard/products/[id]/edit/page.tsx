import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import EditProductPage from "@/features/dashboard/components/products/edit/EditProductPage";

type EditProductRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductRoute({
  params,
}: EditProductRouteProps) {
  const { id } = await params;

  return (
    <DashboardContainer>
      <EditProductPage productId={id} />
    </DashboardContainer>
  );
}
