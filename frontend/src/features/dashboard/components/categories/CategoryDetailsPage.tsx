  "use client";
  
  import {
    Box,
    Button,
    Card,
    Chip,
    CircularProgress,
    Divider,
    Typography,
  } from "@mui/material";
  import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    CircleAlert,
    Edit3,
    Tag,
  } from "lucide-react";
  import Link from "next/link";
  
  import { useGetCategoryQuery } from "@/features/dashboard/api/categoryApi";
  
  type Props = {
    categoryId: string;
  };
  
  function formatDate(date: string) {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }
  
  function InfoItem({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
  }) {
    return (
      <Box className="flex items-start gap-3">
        <Box className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
          {icon}
        </Box>
  
        <Box className="min-w-0">
          <Typography variant="caption" className="mb-1 block! text-gray-400!">
            {label}
          </Typography>
  
          <Typography
            variant="body2"
            className="break-all font-medium! text-gray-800!"
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  export default function CategoryDetailsPage({ categoryId }: Props) {
    const {
      data: category,
      isLoading,
      isError,
      refetch,
    } = useGetCategoryQuery(categoryId);
  
    if (isLoading) {
      return (
        <div className="flex min-h-100 items-center justify-center">
          <CircularProgress size={30} />
        </div>
      );
    }
  
    if (isError || !category) {
      return (
        <div className="flex min-h-100 flex-col items-center justify-center gap-4">
          <Box className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <CircleAlert size={24} />
          </Box>
  
          <Typography variant="body2" className="text-gray-500!">
            دریافت اطلاعات دسته‌بندی با خطا مواجه شد.
          </Typography>
  
          <Button
            variant="outlined"
            onClick={() => refetch()}
            className="rounded-xl!"
          >
            تلاش مجدد
          </Button>
        </div>
      );
    }
  
    return (
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Button
              component={Link}
              href="/dashboard/categories"
              variant="text"
              size="small"
              startIcon={<ArrowRight size={18} />}
              className="min-w-0!"
            >
              بازگشت
            </Button>
  
            <Divider orientation="vertical" flexItem />
  
            <Box>
              <Typography variant="h6" className="font-bold!">
                جزئیات دسته‌بندی
              </Typography>
  
              <Typography variant="caption" className="text-gray-500!">
                اطلاعات کامل دسته‌بندی
              </Typography>
            </Box>
          </div>
  
          <Button
            component={Link}
            href={`/dashboard/categories/${category.id}/edit`}
            variant="outlined"
            startIcon={<Edit3 size={17} />}
            className="rounded-xl!"
          >
            ویرایش دسته‌بندی
          </Button>
        </div>
  
        {/* Main */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Category overview */}
          <Card
            elevation={0}
            className="border border-gray-200 p-6 lg:col-span-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100 text-gray-600">
                <Tag size={38} strokeWidth={1.5} />
              </div>
  
              <Typography variant="h6" className="font-bold!">
                {category.name}
              </Typography>
  
              <Typography variant="body2" className="mt-1! text-gray-500!">
                {category.description || "بدون توضیحات"}
              </Typography>
  
              <Chip
                label={category.is_active ? "فعال" : "غیرفعال"}
                icon={category.is_active ? <CheckCircle2 size={15} /> : undefined}
                size="small"
                className={`mt-5! ${
                  category.is_active
                    ? "bg-emerald-50! text-emerald-600!"
                    : "bg-gray-100! text-gray-500!"
                }`}
              />
            </div>
          </Card>
  
          {/* Information */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Card elevation={0} className="border border-gray-200 p-5">
              <Typography variant="subtitle1" className="mb-5! font-bold!">
                اطلاعات دسته‌بندی
              </Typography>
  
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InfoItem
                  icon={<Tag size={17} />}
                  label="نام دسته‌بندی"
                  value={category.name}
                />
  
                <InfoItem
                  icon={<Tag size={17} />}
                  label="نام آیکون"
                  value={category.icon_name || "بدون آیکون"}
                />
  
                <InfoItem
                  icon={<Tag size={17} />}
                  label="شناسه دسته‌بندی"
                  value={category.id}
                />
  
                <InfoItem
                  icon={<Tag size={17} />}
                  label="ترتیب نمایش"
                  value={category.sort_order}
                />
              </div>
            </Card>
  
            {/* Description */}
            <Card elevation={0} className="border border-gray-200 p-5">
              <Typography variant="subtitle1" className="mb-4! font-bold!">
                توضیحات
              </Typography>
  
              <Box className="rounded-2xl bg-gray-50 p-4">
                <Typography
                  variant="body2"
                  className="whitespace-pre-wrap leading-7! text-gray-600!"
                >
                  {category.description?.trim()
                    ? category.description
                    : "توضیحی برای این دسته‌بندی ثبت نشده است."}
                </Typography>
              </Box>
            </Card>
  
            {/* System information */}
            <Card elevation={0} className="border border-gray-200 p-5">
              <Typography variant="subtitle1" className="mb-5! font-bold!">
                اطلاعات سیستم
              </Typography>
  
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InfoItem
                  icon={<CalendarDays size={17} />}
                  label="تاریخ ایجاد"
                  value={formatDate(category.created_at)}
                />
  
                <InfoItem
                  icon={<CalendarDays size={17} />}
                  label="آخرین بروزرسانی"
                  value={formatDate(category.updated_at)}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
