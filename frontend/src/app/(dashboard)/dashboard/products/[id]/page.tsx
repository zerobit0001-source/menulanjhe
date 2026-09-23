import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import ProductDetailsPage from "@/features/dashboard/components/products/ProductDetailsPage";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsRoute({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <DashboardContainer>
      <ProductDetailsPage productId={id} />
    </DashboardContainer>
  );
}
