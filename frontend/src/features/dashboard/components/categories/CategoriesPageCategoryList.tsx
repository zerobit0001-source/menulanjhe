"use client";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useReorderCategoriesMutation } from "../../api/categoryApi";

import { useMemo } from "react";

import { useGetMenusQuery } from "../../api/menuApi";
import { useGetCategoriesQuery } from "../../api/categoryApi";

import type { Category } from "../../types/categories/categories.type";

import CategoriesPageCategoryCard from "./CategoriesPageCategoryCard";
import SortableCategoryCard from "./SortableCategoryCard";

type Props = {
  search: string;
  filter: "all" | "visible" | "hidden";
};

export default function CategoriesPageCategoryList({ search, filter }: Props) {
  const {
    data: menusData,
    isLoading: isMenusLoading,
    isError: isMenusError,
  } = useGetMenusQuery();

  const activeMenu = useMemo(() => {
    return menusData?.results.find((menu) => menu.is_active);
  }, [menusData]);

  const {
    data,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch,
  } = useGetCategoriesQuery(
    activeMenu
      ? {
          menu: activeMenu.id,
        }
      : undefined,
    {
      skip: !activeMenu,
    },
  );

  console.log(data);

  const [reorderCategories, { isLoading: isReordering }] =
    useReorderCategoriesMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const canReorder = filter === "all" && !search.trim() && !isReordering;

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id || !canReorder) {
      return;
    }

    const oldIndex = categories.findIndex(
      (category) => category.id === active.id,
    );

    const newIndex = categories.findIndex(
      (category) => category.id === over.id,
    );

    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    const reordered = arrayMove(categories, oldIndex, newIndex);

    try {
      await reorderCategories({
        items: reordered.map((category, index) => ({
          id: category.id,
          sort_order: index,
        })),
      }).unwrap();
    } catch {
      // RTK Query خطا را در mutation نگه می‌دارد.
      // در این مرحله، refetch داده‌ها را با سرور هماهنگ می‌کند.
      await refetch();
    }
  }

  if (isMenusLoading || isCategoriesLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-gray-500">در حال دریافت دسته‌بندی‌ها...</p>
      </div>
    );
  }

  if (isMenusError || !activeMenu) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-red-500">منوی فعال پیدا نشد.</p>
      </div>
    );
  }

  if (isCategoriesError) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500">
          دریافت دسته‌بندی‌ها با خطا مواجه شد.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const normalizedSearch = search.trim().toLowerCase();

  const isActive =
    filter === "visible" ? true : filter === "hidden" ? false : undefined;

  const categories: Category[] = [...(data?.results ?? [])]
    .filter((category) => {
      if (isActive === undefined) {
        return true;
      }

      return category.is_active === isActive;
    })
    .filter((category) => {
      if (!normalizedSearch) {
        return true;
      }

      return category.name.toLowerCase().includes(normalizedSearch);
    })
    .sort((a, b) => a.sort_order - b.sort_order);

  if (categories.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500">
            دسته‌بندی‌ای پیدا نشد
          </p>

          <p className="mt-1 text-xs text-gray-400">
            عبارت جستجو یا فیلتر را تغییر دهید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((category) => category.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <SortableCategoryCard
                key={category.id}
                category={category}
                disabled={!canReorder}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
