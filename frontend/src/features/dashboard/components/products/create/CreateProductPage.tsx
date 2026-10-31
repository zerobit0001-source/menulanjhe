"use client";

import { useGetCategoriesQuery } from "@/features/dashboard/api/categoryApi";
import { useGetMenusQuery } from "@/features/dashboard/api/menuApi";
import { useCreateProductMutation } from "@/features/dashboard/api/productApi";
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
import { ArrowRight, PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import ProductImageField from "../ProductImageField";
import { FormSection, getApiErrorMessage } from "../Productformshared";

type FieldErrors = {
  name?: string;
  category?: string;
  price?: string;
};

export default function CreateProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");

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
  } = useGetCategoriesQuery(
    activeMenu
      ? {
          menu: activeMenu.id,
        }
      : {
          menu: "",
        },
  );

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const categories = categoriesData?.results ?? [];

  const isLoading = isMenusLoading || isCategoriesLoading;

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!name.trim()) {
      errors.name = "نام محصول را وارد کنید.";
    }

    if (!category) {
      errors.category = "دسته‌بندی محصول را انتخاب کنید.";
    }

    if (!price.trim()) {
      errors.price = "قیمت محصول را وارد کنید.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreating) {
      return;
    }

    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      await createProduct({
        category,
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        is_featured: isFeatured,
        image: imageFile,
      }).unwrap();

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Create product failed:", error);

      setApiError(getApiErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isMenusError || !activeMenu) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-500">
          منوی فعالی برای ثبت محصول پیدا نشد.
        </p>

        <Button
          variant="outlined"
          onClick={() => router.back()}
          startIcon={<ArrowRight size={18} />}
        >
          بازگشت
        </Button>
      </div>
    );
  }

  if (isCategoriesError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">
          دریافت دسته‌بندی‌ها با خطا مواجه شد.
        </p>

        <Button variant="outlined" onClick={() => router.back()}>
          بازگشت
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button
          type="button"
          variant="text"
          onClick={() => router.back()}
          disabled={isCreating}
          aria-label="بازگشت"
          className="min-w-0! rounded-xl! text-gray-500!"
        >
          <ArrowRight size={20} />
        </Button>

        <div>
          <div className="flex items-center gap-2">
            <PackagePlus size={22} className="text-gray-600" />

            <h1 className="text-xl font-bold text-gray-900">افزودن محصول</h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            محصول جدیدی به منوی {activeMenu.name} اضافه کنید.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Basic info */}
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
                placeholder="مثلاً اسپرسو"
                fullWidth
                required
                disabled={isCreating}
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormControl
                  fullWidth
                  required
                  disabled={isCreating}
                  error={Boolean(fieldErrors.category)}
                >
                  <InputLabel>دسته‌بندی</InputLabel>

                  <Select
                    value={category}
                    label="دسته‌بندی"
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {categories.map((item) => (
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
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    setPrice(value);
                  }}
                  placeholder="مثلاً 45000"
                  fullWidth
                  required
                  disabled={isCreating}
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

          {/* Image */}
          <FormSection
            title="تصویر محصول"
            description="اختیاری"
            className="lg:col-span-1 lg:row-span-2"
          >
            <ProductImageField
              value={imageFile}
              onChange={setImageFile}
              disabled={isCreating}
            />
          </FormSection>

          {/* Description */}
          <FormSection
            title="توضیحات"
            description="توضیح کوتاهی درباره محصول"
            className="lg:col-span-2"
          >
            <TextField
              label="توضیحات"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="توضیح کوتاهی درباره محصول..."
              multiline
              minRows={4}
              fullWidth
              disabled={isCreating}
            />
          </FormSection>

          {/* Settings */}
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
                disabled={isCreating}
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

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.back()}
            disabled={isCreating}
            className="rounded-xl! border-gray-200! text-gray-600!"
          >
            انصراف
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isCreating}
            className="min-w-36 rounded-xl! px-6! shadow-none!"
          >
            {isCreating ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "افزودن محصول"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
