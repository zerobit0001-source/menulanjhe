import CategoriesPageAddCategoryButton from "@/features/dashboard/components/categories/CategoriesPageAddCategoryButton";
import CategoriesPageCategoryList from "@/features/dashboard/components/categories/CategoriesPageCategoryList";
import CategoryPageCategoriesToolbar from "@/features/dashboard/components/categories/CategoryPageCategoriesToolbar";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";

import { Layers } from "lucide-react";

interface CategoriesPageProps {
  searchParams: Promise<{
    search?: string;
    filter?: "all" | "visible" | "hidden";
  }>;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const filter =
    params.filter === "visible" || params.filter === "hidden"
      ? params.filter
      : "all";

  return (
    <DashboardContainer>
      <SectionTitle
        title="دسته‌بندی‌ها"
        icon={<Layers size={20} className="text-gray-500" />}
      >
        <CategoriesPageAddCategoryButton />
      </SectionTitle>

      <CategoryPageCategoriesToolbar search={search} filter={filter} />

      <CategoriesPageCategoryList search={search} filter={filter} />
    </DashboardContainer>
  );
}
