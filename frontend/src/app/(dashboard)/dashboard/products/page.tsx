import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import ProductsPageProductsList from "@/features/dashboard/components/products/ProductsPageProductsList";
import ProductsPageToolbar from "@/features/dashboard/components/products/ProductsPageToolbar";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import { Button } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    filter?: "all" | "DISABLED" | "VISIBLE";
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const filter = params.filter ?? "all";

  return (
    <DashboardContainer>
      <SectionTitle
        title="محصولات"
        icon={<ShoppingCart size={20} className="text-gray-500" />}
        count={23}
      >
        <Link href="/dashboard/products/create">
          <Button variant="contained">افزودن محصول</Button>
        </Link>
      </SectionTitle>

      <ProductsPageToolbar search={search} filter={filter} />

      <ProductsPageProductsList search={search} filter={filter} />
    </DashboardContainer>
  );
}
