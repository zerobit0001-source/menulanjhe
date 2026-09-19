"use client";

import { CircularProgress } from "@mui/material";
import { useGetProductsQuery } from "../../api/productApi";
import ProductPageProductCard from "./ProductPageProductCard";
import ProductsPagination from "./ProductsPageProductsPagination";

type Props = {
  search: string;
  filter: "all" | "DISABLED" | "VISIBLE";
  page: number;
};

export default function ProductsPageProductsList({
  search,
  filter,
  page,
}: Props) {
  const isAvailable =
    filter === "VISIBLE" ? true : filter === "DISABLED" ? false : undefined;

  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery(
    {
      search: search || undefined,
      is_available: isAvailable,
      page,
    },
  );

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <CircularProgress size={28} />
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
    <>
      <div className="relative">
        {isFetching && (
          <div className="absolute left-0 top-0 z-10">
            <CircularProgress size={18} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {data.results.map((product) => (
            <ProductPageProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {data.total_pages > 1 && (
        <ProductsPagination
          currentPage={data.current_page}
          totalPages={data.total_pages}
        />
      )}
    </>
  );
}
