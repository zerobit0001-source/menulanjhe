"use client";

import { useGetProductsQuery } from "../../api/productApi";
import ProductPageProductCard from "./ProductPageProductCard";

type Props = {
  search: string;
  filter: "all" | "DISABLED" | "VISIBLE";
};

export default function ProductsPageProductsList({ search, filter }: Props) {
  const isAvailable =
    filter === "VISIBLE" ? true : filter === "DISABLED" ? false : undefined;

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    search,
    is_available: isAvailable,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-gray-500">در حال دریافت محصولات...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">دریافت محصولات با خطا مواجه شد.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-gray-500">محصولی پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {data.results.map((product) => (
        <ProductPageProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
