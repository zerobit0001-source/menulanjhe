"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/features/dashboard/api/productApi";

import { useGetMenusQuery } from "@/features/dashboard/api/menuApi";
import { useGetCategoriesQuery } from "@/features/dashboard/api/categoryApi";

type Props = {
  productId: string;
};

export default function EditProductPage({ productId }: Props) {
  const router = useRouter();

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductQuery(productId);

  const { data: menusData, isLoading: isMenusLoading } = useGetMenusQuery();

  const activeMenu = menusData?.results?.find((menu) => menu.is_active);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery(
      activeMenu
        ? {
            menu: activeMenu.id,
          }
        : undefined,
      {
        skip: !activeMenu,
      },
    );

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!product) return;

    setName(product.name);
    setPrice(String(product.price));
    setDescription(product.description ?? "");
    setCategory(product.category);
    setImage(product.image ?? "");
    setIsFeatured(product.is_featured);
  }, [product]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("نام محصول را وارد کنید.");
      return;
    }

    if (!price.trim()) {
      setErrorMessage("قیمت محصول را وارد کنید.");
      return;
    }

    if (!category) {
      setErrorMessage("دسته‌بندی محصول را انتخاب کنید.");
      return;
    }

    try {
      await updateProduct({
        id: productId,
        body: {
          category,
          name: name.trim(),
          description: description.trim(),
          image: image.trim() || null,
          price: price.trim(),
          is_featured: isFeatured,
        },
      }).unwrap();

      router.push(`/dashboard/products/${productId}`);
    } catch (error) {
      console.error("Update product error:", error);

      setErrorMessage("ویرایش محصول با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    }
  };

  if (isProductLoading || isMenusLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isProductError || !product) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4">
        <Typography variant="body2" className="text-red-500!">
          اطلاعات محصول دریافت نشد.
        </Typography>

        <Button
          component={Link}
          href="/dashboard/products"
          variant="outlined"
          className="rounded-xl!"
        >
          بازگشت به محصولات
        </Button>
      </div>
    );
  }

  const isLoadingForm = isCategoriesLoading || !activeMenu;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Box>
          <Button
            component={Link}
            href={`/dashboard/products/${productId}`}
            variant="text"
            size="small"
            startIcon={<ArrowRight size={18} />}
            className="mb-2!"
          >
            بازگشت به محصول
          </Button>

          <Typography variant="h5" className="font-bold!">
            ویرایش محصول
          </Typography>

          <Typography variant="body2" className="mt-1! text-gray-500!">
            اطلاعات محصول را ویرایش کنید.
          </Typography>
        </Box>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* Basic information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <Typography variant="subtitle1" className="mb-5! font-bold!">
              اطلاعات اصلی
            </Typography>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextField
                label="نام محصول"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                required
              />

              <TextField
                label="قیمت"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                fullWidth
                required
                inputMode="decimal"
              />

              <FormControl fullWidth required>
                <InputLabel>دسته‌بندی</InputLabel>

                <Select
                  value={category}
                  label="دسته‌بندی"
                  onChange={(event) => setCategory(event.target.value)}
                  disabled={isLoadingForm}
                >
                  {categoriesData?.results?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="تصویر محصول"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                fullWidth
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <Typography variant="subtitle1" className="mb-5! font-bold!">
              توضیحات
            </Typography>

            <TextField
              label="توضیحات محصول"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              multiline
              minRows={5}
              placeholder="توضیحی درباره محصول..."
            />
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <Typography variant="subtitle1" className="mb-4! font-bold!">
              تنظیمات محصول
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={isFeatured}
                  onChange={(event) => setIsFeatured(event.target.checked)}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" className="font-medium!">
                    محصول ویژه
                  </Typography>

                  <Typography variant="caption" className="text-gray-500!">
                    این محصول به عنوان محصول ویژه نمایش داده شود.
                  </Typography>
                </Box>
              }
            />
          </div>

          {/* Error */}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              component={Link}
              href={`/dashboard/products/${productId}`}
              variant="outlined"
              disabled={isUpdating}
              className="rounded-xl!"
            >
              انصراف
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isUpdating}
              startIcon={
                isUpdating ? (
                  <CircularProgress size={17} color="inherit" />
                ) : (
                  <Save size={17} />
                )
              }
              className="rounded-xl!"
            >
              {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
