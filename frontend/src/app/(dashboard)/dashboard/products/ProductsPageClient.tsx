"use client";

import { Button } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import ProductsPageProductsList from "@/features/dashboard/components/products/ProductsPageProductsList";
import ProductsPageToolbar from "@/features/dashboard/components/products/ProductsPageToolbar";

type FilterValue = "all" | "DISABLED" | "VISIBLE";

type Props = {
  search: string;
  filter: FilterValue;
  page: number;
  category: string;
};

export default function ProductsPageClient({ search, filter, page, category }: Props) {
  return (
    <>
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

      <ProductsPageProductsList search={search} filter={filter} page={page} category={category} />
    </>
  );
}
