"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Utensils,
} from "lucide-react";
import { toast } from "react-toastify";

import { useGetMenusQuery } from "@/features/dashboard/api/menuApi";
import { useGetCategoriesQuery } from "@/features/dashboard/api/categoryApi";
import { useGetProductsQuery } from "@/features/dashboard/api/productApi";
import { useGetTablesQuery } from "@/features/dashboard/api/tableApi";
import { useCreateAdminOrderMutation } from "@/features/dashboard/api/orderApi";

import type { Product } from "@/features/dashboard/types/products/products.type";
import type { Table } from "@/features/dashboard/types/tables/tables.type";

type CartItem = {
  product: Product;
  quantity: number;
};

function formatPrice(price: number) {
  return `${Math.round(price).toLocaleString("fa-IR")} تومان`;
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = error.data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  return "ثبت سفارش با خطا مواجه شد. لطفاً دوباره تلاش کنید.";
}

export default function CreateOrderClientPage() {
  const router = useRouter();

  // --------------------------------------------------
  // Queries
  // --------------------------------------------------

  const { data: menusData, isLoading: menusLoading } = useGetMenusQuery();

  const menus = menusData?.results ?? [];

  const [selectedMenuId, setSelectedMenuId] = useState("");

  useEffect(() => {
    if (!selectedMenuId && menus.length > 0) {
      const activeMenu = menus.find((menu) => menu.is_active);

      setSelectedMenuId(activeMenu?.id ?? menus[0].id);
    }
  }, [menus, selectedMenuId]);

  const selectedMenu = menus.find((menu) => menu.id === selectedMenuId);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery(
      {
        menu: selectedMenuId,
      },
      {
        skip: !selectedMenuId,
      },
    );

  const categories = categoriesData?.results ?? [];

  // --------------------------------------------------
  // Product filters
  // --------------------------------------------------

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [productPage, setProductPage] = useState(1);

  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetProductsQuery(
    {
      page: productPage,
      ...(selectedCategoryId && {
        category: selectedCategoryId,
      }),
      ...(productSearch.trim() && {
        search: productSearch.trim(),
      }),
      is_available: true,
    },
    {
      skip: !selectedMenuId,
    },
  );

  const products = productsData?.results ?? [];

  // --------------------------------------------------
  // Tables
  // --------------------------------------------------

  const [tablePage, setTablePage] = useState(1);
  const [selectedTableId, setSelectedTableId] = useState("");

  const { data: tablesData, isLoading: tablesLoading } = useGetTablesQuery({
    page: tablePage,
  });

  const tables = tablesData?.results ?? [];

  // فقط میزهای فعال شعبه منوی انتخاب‌شده
  const availableTables = tables.filter(
    (table) =>
      table.is_active &&
      (!selectedMenu || table.branch === selectedMenu.branch),
  );

  const selectedTable = availableTables.find(
    (table) => table.id === selectedTableId,
  );

  // --------------------------------------------------
  // Cart
  // --------------------------------------------------

  const [cart, setCart] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] = useState("مشتری حضوری");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const [idempotencyKey, setIdempotencyKey] = useState<string | undefined>();

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0,
      ),
    [cart],
  );

  const resetIdempotencyKey = () => {
    setIdempotencyKey(undefined);
  };

  const addToCart = (product: Product) => {
    resetIdempotencyKey();

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    resetIdempotencyKey();

    setCart((currentCart) => {
      if (quantity <= 0) {
        return currentCart.filter((item) => item.product.id !== productId);
      }

      return currentCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      );
    });
  };

  const removeFromCart = (productId: string) => {
    resetIdempotencyKey();

    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId),
    );
  };

  // --------------------------------------------------
  // Create order mutation
  // --------------------------------------------------

  const [createAdminOrder, { isLoading: isSubmitting }] =
    useCreateAdminOrderMutation();

  const handleSubmit = async () => {
    if (cart.length === 0) {
      toast.error("حداقل یک محصول به سفارش اضافه کنید.");
      return;
    }

    if (!selectedTableId || !selectedTable) {
      toast.error("لطفاً یک میز انتخاب کنید.");
      return;
    }

    if (!customerName.trim()) {
      toast.error("نام مشتری را وارد کنید.");
      return;
    }

    const requestKey = idempotencyKey ?? crypto.randomUUID();

    setIdempotencyKey(requestKey);

    try {
      await createAdminOrder({
        order_type: "DINE_IN",
        table_id: selectedTableId,
        branch: selectedMenu?.branch,
        idempotency_key: requestKey,

        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),

        customer: {
          name: customerName.trim(),
          ...(customerPhone.trim() && {
            phone: customerPhone.trim(),
          }),
        },

        ...(orderNote.trim() && {
          notes: orderNote.trim(),
        }),
      }).unwrap();

      toast.success("سفارش با موفقیت ثبت شد.");

      setCart([]);
      setIdempotencyKey(undefined);

      router.push("/dashboard/orders");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  // --------------------------------------------------
  // Loading / empty states
  // --------------------------------------------------

  if (menusLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-sm text-gray-500">در حال دریافت اطلاعات منو...</p>
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <Package size={32} className="text-gray-400" />

        <h2 className="font-semibold text-gray-800">منویی پیدا نشد</h2>

        <p className="text-sm text-gray-500">
          برای ثبت سفارش ابتدا باید یک منو ایجاد کنید.
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/orders")}
            className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
            aria-label="بازگشت به سفارش‌ها"
          >
            <ArrowRight size={19} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">ثبت سفارش جدید</h1>

            <p className="mt-1 text-sm text-gray-500">
              محصولات موردنظر را انتخاب و سفارش را ثبت کنید.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm text-blue-700">
          <Utensils size={17} />
          سفارش حضوری
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Products section */}
        <section className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          {/* Menu selection */}
          {menus.length > 1 && (
            <div className="mb-5">
              <label
                htmlFor="menu-select"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                انتخاب منو
              </label>

              <select
                id="menu-select"
                value={selectedMenuId}
                onChange={(event) => {
                  setSelectedMenuId(event.target.value);
                  setSelectedCategoryId("");
                  setProductPage(1);
                  setSelectedTableId("");
                  setTablePage(1);
                  setCart([]);
                  resetIdempotencyKey();
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
              >
                {menus.map((menu) => (
                  <option
                    key={menu.id}
                    value={menu.id}
                    disabled={!menu.is_active}
                  >
                    {menu.name}
                    {!menu.is_active ? " (غیرفعال)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={productSearch}
              onChange={(event) => {
                setProductSearch(event.target.value);
                setProductPage(1);
              }}
              placeholder="جستجوی محصول..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-10 pl-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Categories */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId("");
                setProductPage(1);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                !selectedCategoryId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              همه محصولات
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setProductPage(1);
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                  selectedCategoryId === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="mt-6">
            {categoriesLoading || productsLoading ? (
              <div className="flex min-h-64 items-center justify-center text-sm text-gray-500">
                در حال دریافت محصولات...
              </div>
            ) : products.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
                <Package size={36} className="text-gray-300" />

                <p className="font-medium text-gray-700">محصولی پیدا نشد</p>

                <p className="text-sm text-gray-400">
                  محصولات موجود این دسته‌بندی در این قسمت نمایش داده می‌شوند.
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ${
                    productsFetching ? "opacity-60" : ""
                  }`}
                >
                  {products.map((product) => {
                    const cartItem = cart.find(
                      (item) => item.product.id === product.id,
                    );

                    return (
                      <div
                        key={product.id}
                        className="overflow-hidden relative rounded-2xl border border-gray-200 bg-white transition hover:border-blue-200 hover:shadow-sm"
                      >
                        {cartItem && (
                          <span className="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                            {cartItem.quantity}
                          </span>
                        )}

                        <div className="flex flex-col gap-3 p-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-gray-800">
                              {product.name}
                            </h3>

                            <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-5 text-gray-400">
                              {product.description || "بدون توضیحات"}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-gray-800">
                              {formatPrice(Number(product.price))}
                            </span>

                            <button
                              type="button"
                              onClick={() => addToCart(product)}
                              className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                              aria-label={`افزودن ${product.name}`}
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Product pagination */}
                {productsData && productsData.total_pages > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={productPage === 1 || productsFetching}
                      onClick={() => setProductPage((page) => page - 1)}
                      className="flex size-9 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
                    >
                      <ChevronRight size={18} />
                    </button>

                    <span className="text-sm text-gray-500">
                      صفحه {productsData.current_page} از{" "}
                      {productsData.total_pages}
                    </span>

                    <button
                      type="button"
                      disabled={
                        productPage === productsData.total_pages ||
                        productsFetching
                      }
                      onClick={() => setProductPage((page) => page + 1)}
                      className="flex size-9 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Order sidebar */}
        <aside className="flex flex-col gap-5 xl:sticky xl:top-6">
          {/* Table selection */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Utensils size={19} className="text-gray-500" />

              <h2 className="font-semibold text-gray-800">اطلاعات میز</h2>
            </div>

            <label
              htmlFor="table-select"
              className="mb-2 block text-sm text-gray-600"
            >
              انتخاب میز
            </label>

            <select
              id="table-select"
              value={selectedTableId}
              onChange={(event) => {
                setSelectedTableId(event.target.value);
                resetIdempotencyKey();
              }}
              disabled={tablesLoading}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">
                {tablesLoading
                  ? "در حال دریافت میزها..."
                  : "یک میز انتخاب کنید"}
              </option>

              {availableTables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.name} - شماره {table.number}
                </option>
              ))}
            </select>

            {!tablesLoading && availableTables.length === 0 && (
              <p className="mt-2 text-xs text-red-500">
                برای این شعبه میز فعالی پیدا نشد.
              </p>
            )}

            {selectedTable && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
                <Check size={17} />

                <span>{selectedTable.name} انتخاب شده است.</span>
              </div>
            )}

            {tablesData && tablesData.total_pages > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  disabled={tablePage === 1}
                  onClick={() => setTablePage((page) => page - 1)}
                  className="text-xs text-blue-600 disabled:opacity-40"
                >
                  میزهای قبلی
                </button>

                <span className="text-xs text-gray-400">
                  {tablesData.current_page} از {tablesData.total_pages}
                </span>

                <button
                  type="button"
                  disabled={tablePage === tablesData.total_pages}
                  onClick={() => setTablePage((page) => page + 1)}
                  className="text-xs text-blue-600 disabled:opacity-40"
                >
                  میزهای بعدی
                </button>
              </div>
            )}
          </section>

          {/* Customer information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-800">اطلاعات مشتری</h2>

            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-sm text-gray-600"
                >
                  نام مشتری
                </label>

                <input
                  id="customer-name"
                  value={customerName}
                  onChange={(event) => {
                    setCustomerName(event.target.value);
                    resetIdempotencyKey();
                  }}
                  placeholder="نام مشتری"
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="mb-2 block text-sm text-gray-600"
                >
                  شماره تماس
                  <span className="mr-1 text-xs text-gray-400">(اختیاری)</span>
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(event) => {
                    setCustomerPhone(event.target.value);
                    resetIdempotencyKey();
                  }}
                  placeholder="09xxxxxxxxx"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Cart */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={19} className="text-gray-500" />

                <h2 className="font-semibold text-gray-800">سبد سفارش</h2>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                {cartCount.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <ShoppingBag size={30} className="text-gray-300" />

                <p className="text-sm text-gray-500">
                  هنوز محصولی انتخاب نکرده‌اید.
                </p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {formatPrice(Number(item.product.price))}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex size-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600"
                          aria-label="کاهش تعداد"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="min-w-5 text-center text-sm font-semibold">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex size-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600"
                          aria-label="افزایش تعداد"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {formatPrice(
                          Number(item.product.price) * item.quantity,
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 transition hover:text-red-500"
                        aria-label="حذف محصول"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order note */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <label
                htmlFor="order-note"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                یادداشت سفارش
                <span className="mr-1 text-xs font-normal text-gray-400">
                  (اختیاری)
                </span>
              </label>

              <textarea
                id="order-note"
                value={orderNote}
                onChange={(event) => {
                  setOrderNote(event.target.value);
                  resetIdempotencyKey();
                }}
                rows={3}
                placeholder="مثلاً بدون شکر، یخ جداگانه و..."
                className="w-full resize-none rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Total */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">مجموع سفارش</span>

                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                قیمت نهایی توسط سرور محاسبه می‌شود.
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || cart.length === 0 || !selectedTableId}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? (
                  "در حال ثبت سفارش..."
                ) : (
                  <>
                    <Check size={18} />
                    ثبت سفارش
                  </>
                )}
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
