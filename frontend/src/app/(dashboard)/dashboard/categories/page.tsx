import CategoriesPageAddCategoryButton from "@/features/dashboard/components/categories/CategoriesPageAddCategoryButton";
import CategoriesPageCategoryList from "@/features/dashboard/components/categories/CategoriesPageCategoryList";
import CategoryPageCategoriesToolbar from "@/features/dashboard/components/categories/CategoryPageCategoriesToolbar";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import { Button } from "@mui/material";
import { Layers, LayersPlus } from "lucide-react";

export default function CategoriesPage() {
  return (
    <DashboardContainer>
      <SectionTitle
        title="دسته‌بندی‌ها"
        icon={<Layers size={20} className="text-gray-500" />}
      >
        <CategoriesPageAddCategoryButton />
      </SectionTitle>
      <CategoryPageCategoriesToolbar />
      <CategoriesPageCategoryList />
    </DashboardContainer>
  );
}
