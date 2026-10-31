"use client";

import { useGetCategoriesQuery } from "@/features/dashboard/api/categoryApi";
import { useGetMenusQuery } from "@/features/dashboard/api/menuApi";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/features/dashboard/api/productApi";
import type { Product } from "@/features/dashboard/types/products/products.type";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ArrowRight, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import ProductImageField from "../ProductImageField";
import { FormSection, getApiErrorMessage } from "../Productformshared";

/**
 * Removing an existing image needs a confirmed backend convention
 * (e.g. a dedicated flag or `image: null` handling in Django), and none exists
 * yet. While this is `false` the "remove existing image" action is hidden and
 * nothing is ever sent for removal. Flip it only after the backend supports it
 * and `updateProduct` is extended to send the agreed field.
 */
const IMAGE_REMOVAL_SUPPORTED = false;

const UPDATE_ERROR_FALLBACK = "ویرایش محصول انجام نشد. لطفاً دوباره تلاش کنید.";

type FieldErrors = {
  name?: string;
  category?: string;
  price?: string;
};

type CategoryOption = {
  id: string;
  name: string;
};

/** Backend may return decimals like "45000.00"; the form works with integers. */
function toPriceInput(price: string | null | undefined): string {
  return (price ?? "").split(".")[0].replace(/\D/g, "");
}

type EditProductFormProps = {
  product: Product;
  categories: CategoryOption[];
};

/**
 * Mounted only after product + categories are loaded, so initial state comes
 * straight from the product and later RTK Query refetches never reset what the
 * user has typed.
 */
function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter();
  const productUrl = `/dashboard/products/${product.id}`;

  const [name, setName] = useState(product.name ?? "");
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description ?? "");
  const [category, setCategory] = useState(product.category ?? "");
  const [isFeatured, setIsFeatured] = useState(Boolean(product.is_featured));

  // Three separate image states — never mixed:
  const existingImageUrl = product.image ?? null; // 1. what the backend has
  const [imageFile, setImageFile] = useState<File | null>(null); // 2. pending new File
  const [removeExistingImage, setRemoveExistingImage] = useState(false); // 3. removal intent (UI only)

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // The product's category may belong to a menu other than the active one.
  const categoryOptions = useMemo(() => {
    if (
      product.category &&
      !categories.some((item) => item.id === product.category)
    ) {
      return [
        { id: product.category, name: product.category_name },
        ...categories,
      ];
    }

    return categories;
  }, [categories, product.category, product.category_name]);

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!name.trim()) errors.name = "نام محصول را وارد کنید.";
    if (!category) errors.category = "دسته‌بندی محصول را انتخاب کنید.";
    // if (!price.trim()) errors.price = "قیمت محصول را وارد کنید.";

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isUpdating) return;

    setApiError("");

    if (!validate()) return;

    try {
      await updateProduct({
        id: product.id,
        body: {
          category,
          name: name.trim(),
          description: description.trim(),
          price: price,
          is_featured: isFeatured,
          // Scenario A: null → no image field is sent, old image is kept.
          // Scenario B: File → sent as multipart `image`.
          image: imageFile,
        },
      }).unwrap();

      router.push(productUrl);
    } catch (error) {
      console.error("Update product failed:", error);

      // Stay on the page; all entered values are preserved.
      setApiError(getApiErrorMessage(error, UPDATE_ERROR_FALLBACK));
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button
          type="button"
          variant="text"
          onClick={() => router.push(productUrl)}
          disabled={isUpdating}
          aria-label="بازگشت"
          className="min-w-0! rounded-xl! text-gray-500!"
        >
          <ArrowRight size={20} />
        </Button>

        <div>
          <div className="flex items-center gap-2">
            <PackageCheck size={22} className="text-gray-600" />

            <h1 className="text-xl font-bold text-gray-900">ویرایش محصول</h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            اطلاعات محصول را ویرایش کنید.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <FormSection
            title="اطلاعات اصلی"
            description="نام، دسته‌بندی و قیمت محصول"
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-5">
              <TextField
                label="نام محصول"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                required
                disabled={isUpdating}
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormControl
                  fullWidth
                  required
                  disabled={isUpdating}
                  error={Boolean(fieldErrors.category)}
                >
                  <InputLabel>دسته‌بندی</InputLabel>

                  <Select
                    value={category}
                    label="دسته‌بندی"
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {categoryOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {fieldErrors.category && (
                    <FormHelperText>{fieldErrors.category}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  label="قیمت"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value.replace(/\D/g, ""))
                  }
                  fullWidth
                  required
                  disabled={isUpdating}
                  error={Boolean(fieldErrors.price)}
                  helperText={fieldErrors.price}
                  slotProps={{
                    htmlInput: { inputMode: "numeric" },
                    input: {
                      endAdornment: (
                        <span className="ml-2 text-sm text-gray-400">
                          تومان
                        </span>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="تصویر محصول"
            description="برای تغییر تصویر، فایل جدید انتخاب کنید"
            className="lg:col-span-1 lg:row-span-2"
          >
            <ProductImageField
              value={imageFile}
              onChange={setImageFile}
              existingImageUrl={removeExistingImage ? null : existingImageUrl}
              onRemoveExisting={
                IMAGE_REMOVAL_SUPPORTED
                  ? () => setRemoveExistingImage(true)
                  : undefined
              }
              disabled={isUpdating}
            />

            {removeExistingImage && (
              <Alert
                severity="warning"
                className="mt-3"
                action={
                  <Button
                    type="button"
                    size="small"
                    color="inherit"
                    onClick={() => setRemoveExistingImage(false)}
                    disabled={isUpdating}
                  >
                    بازگردانی
                  </Button>
                }
              >
                تصویر فعلی پس از ذخیره حذف می‌شود.
              </Alert>
            )}
          </FormSection>

          <FormSection
            title="توضیحات"
            description="توضیح کوتاهی درباره محصول"
            className="lg:col-span-2"
          >
            <TextField
              label="توضیحات"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              multiline
              minRows={4}
              fullWidth
              disabled={isUpdating}
            />
          </FormSection>

          <FormSection title="تنظیمات محصول" className="lg:col-span-3">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  محصول ویژه
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  این محصول به عنوان محصول ویژه نمایش داده شود.
                </p>
              </div>

              <Switch
                checked={isFeatured}
                onChange={(event) => setIsFeatured(event.target.checked)}
                disabled={isUpdating}
                slotProps={{ input: { "aria-label": "محصول ویژه" } }}
              />
            </div>
          </FormSection>
        </div>

        {apiError && (
          <Alert severity="error" className="mt-5" role="alert">
            {apiError}
          </Alert>
        )}

        <div className="mt-5 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(productUrl)}
            disabled={isUpdating}
            className="rounded-xl! border-gray-200! text-gray-600!"
          >
            انصراف
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isUpdating}
            className="min-w-36 rounded-xl! px-6! shadow-none!"
          >
            {isUpdating ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "ذخیره تغییرات"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

type EditProductPageProps = {
  productId: string;
};

export default function EditProductPage({ productId }: EditProductPageProps) {
  const router = useRouter();

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductQuery(productId);

  const {
    data: menusData,
    isLoading: isMenusLoading,
    isError: isMenusError,
  } = useGetMenusQuery();

  const activeMenu = useMemo(
    () => menusData?.results.find((menu) => menu.is_active),
    [menusData],
  );

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery({ menu: activeMenu ? activeMenu.id : "" });

  if (isProductLoading || isMenusLoading || isCategoriesLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isProductError || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">
          دریافت اطلاعات محصول با خطا مواجه شد.
        </p>

        <Button
          variant="outlined"
          onClick={() => router.push("/dashboard/products")}
        >
          بازگشت
        </Button>
      </div>
    );
  }

  if (isMenusError || isCategoriesError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">
          دریافت دسته‌بندی‌ها با خطا مواجه شد.
        </p>

        <Button
          variant="outlined"
          onClick={() => router.push(`/dashboard/products/${productId}`)}
        >
          بازگشت
        </Button>
      </div>
    );
  }

  return (
    <EditProductForm
      key={product.id}
      product={product}
      categories={categoriesData?.results ?? []}
    />
  );
}
