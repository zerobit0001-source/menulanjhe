import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import ProductsPageClient from "./ProductsPageClient";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    filter?: "all" | "DISABLED" | "VISIBLE";
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const filter = params.filter ?? "all";
  const page = Number(params.page) || 1;

  return (
    <DashboardContainer>
      <ProductsPageClient search={search} filter={filter} page={page} />
    </DashboardContainer>
  );
}
