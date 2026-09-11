"use client";

import { Search } from "lucide-react";
import {
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

type CategoryFilter = "all" | "visible" | "hidden";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  filter: CategoryFilter;
  onFilterChange: (value: CategoryFilter) => void;
};

const filters: {
  value: CategoryFilter;
  label: string;
}[] = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "visible",
    label: "فعال",
  },
  {
    value: "hidden",
    label: "غیرفعال",
  },
];

export default function CategoryPageCategoriesToolbar({
  // search,
  onSearchChange,
  // filter,
  onFilterChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");
  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: CategoryFilter | null,
  ) => {
    if (newFilter) {
      setFilter(newFilter);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <Paper
        elevation={0}
        className="flex h-10 w-full items-center gap-2 rounded-xl! border border-gray-200! bg-white! px-3 sm:max-w-xs"
      >
        <Search size={18} className="shrink-0 text-gray-400" />

        <InputBase
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="جستجوی دسته‌بندی..."
          fullWidth
          className="text-sm!"
        />
      </Paper>

      {/* Filter */}
      <ToggleButtonGroup
        exclusive
        value={filter}
        onChange={handleFilterChange}
        size="small"
        className="w-full sm:w-auto"
      >
        {filters.map((item) => (
          <ToggleButton
            key={item.value}
            value={item.value}
            className="flex-1! border-gray-200! px-4! text-xs! sm:flex-none!"
          >
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
