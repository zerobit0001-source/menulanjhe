export default function ProductsPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const goToPage = (page: number) => {
    const params = new URLSearchParams(window.location.search);

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const queryString = params.toString();

    window.location.href = queryString
      ? `/dashboard/products?${queryString}`
      : "/dashboard/products";
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        قبلی
      </button>

      <span className="text-sm text-gray-500">
        صفحه {currentPage} از {totalPages}
      </span>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        بعدی
      </button>
    </div>
  );
}
