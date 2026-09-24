"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Save } from "lucide-react";
import { toast } from "react-toastify";

import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/features/dashboard/api/categoryApi";

import { categoryIcons } from "../../Icons";

export default function EditCategoryPage({ id }: { id: string }) {
  const router = useRouter();

  const { data: category, isLoading, isError } = useGetCategoryQuery(id);

  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    if (!category) return;

    setName(category.name);
    setDescription(category.description ?? "");
    setIconName(category.icon_name ?? "");
  }, [category]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("نام دسته‌بندی الزامی است.");
      return;
    }

    if (!iconName) {
      toast.error("لطفاً یک آیکن انتخاب کنید.");
      return;
    }

    try {
      await updateCategory({
        id,
        body: {
          name: name.trim(),
          description: description.trim(),
          icon_name: iconName,
        },
      }).unwrap();

      toast.success("دسته‌بندی با موفقیت ویرایش شد.");

      router.push(`/dashboard/categories/${id}`);
    } catch (error) {
      console.error("Update category error:", error);

      toast.error("ویرایش دسته‌بندی با خطا مواجه شد.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !category) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          دریافت اطلاعات دسته‌بندی با خطا مواجه شد.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ویرایش دسته‌بندی</h1>

          <p className="mt-1 text-sm text-gray-500">
            اطلاعات دسته‌بندی را ویرایش کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowRight size={18} />
          بازگشت
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نام دسته‌بندی
            </label>

            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً غذای اصلی"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              توضیحات
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیح کوتاهی درباره این دسته‌بندی..."
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
            />
          </div>

          {/* Icons */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              آیکن دسته‌بندی
            </label>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {categoryIcons.map(({ value, label, icon: Icon }) => {
                const isSelected = iconName === value;

                return (
                  <button
                    key={value}
                    type="button"
                    title={label}
                    onClick={() => setIconName(value)}
                    className={`flex h-20 flex-col items-center justify-center gap-2 rounded-xl border transition ${
                      isSelected
                        ? "border-gray-900 bg-gray-100 text-gray-900"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={24} />

                    <span className="text-xs">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isUpdating}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                در حال ذخیره...
              </>
            ) : (
              <>
                <Save size={18} />
                ذخیره تغییرات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
