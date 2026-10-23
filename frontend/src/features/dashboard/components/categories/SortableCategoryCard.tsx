"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CategoriesPageCategoryCard from "./CategoriesPageCategoryCard";
import type { Category } from "../../types/categories/categories.type";

type Props = {
  category: Category;
  disabled?: boolean;
};

export default function SortableCategoryCard({
  category,
  disabled = false,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: "relative",
        zIndex: isDragging ? 1 : undefined,
      }}
      {...attributes}
    >
      <CategoriesPageCategoryCard
        category={category}
        dragHandleProps={{
          ...listeners,
          disabled,
        }}
      />
    </div>
  );
}
