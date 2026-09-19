"use client";

import { useGetCategoriesQuery } from "@/features/dashboard/api/categoryApi";
import { useGetMenusQuery } from "@/features/dashboard/api/menuApi";
import { useCreateProductMutation } from "@/features/dashboard/api/productApi";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { ArrowRight, PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CreateProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!category || !name.trim() || !price.trim()) {
      return;
    }

    try {
      await createProduct({
        category,
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        is_featured: isFeatured,
      }).unwrap();

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Create product failed:", error);
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
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button
          type="button"
          variant="text"
          onClick={() => router.back()}
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-col gap-5">
          {/* Name */}
          <TextField
            label="نام محصول"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="مثلاً اسپرسو"
            fullWidth
            required
          />

          {/* Category */}
          <FormControl fullWidth required>
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
          </FormControl>

          {/* Price */}
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
            slotProps={{
              input: {
                endAdornment: (
                  <span className="ml-2 text-sm text-gray-400">تومان</span>
                ),
              },
            }}
          />

          {/* Description */}
          <TextField
            label="توضیحات"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="توضیح کوتاهی درباره محصول..."
            multiline
            minRows={4}
            fullWidth
          />

          {/* Featured */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-800">محصول ویژه</p>

              <p className="mt-1 text-xs text-gray-500">
                این محصول به عنوان محصول ویژه نمایش داده شود.
              </p>
            </div>

            <FormControlLabel
              control={
                <Switch
                  checked={isFeatured}
                  onChange={(event) => setIsFeatured(event.target.checked)}
                />
              }
              label=""
            />
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
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
              disabled={
                isCreating || !name.trim() || !price.trim() || !category
              }
              className="rounded-xl! px-6! shadow-none!"
            >
              {isCreating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "افزودن محصول"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
