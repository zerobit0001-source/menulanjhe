import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import ProductsPageProductsList from "@/features/dashboard/components/products/ProductsPageProductsList";
import ProductsPageToolbar from "@/features/dashboard/components/products/ProductsPageToolbar";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import { ShoppingCart } from "lucide-react";

export default function ProductsPage() {
  return (
    <DashboardContainer>
      <SectionTitle
        title="محصولات"
        icon={<ShoppingCart size={20} className="text-gray-500" />}
        count={23}
      />
      <ProductsPageToolbar />
      <ProductsPageProductsList />
    </DashboardContainer>
  );
}
