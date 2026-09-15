"use client";

import { Search } from "lucide-react";
import {
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryFilter = "all" | "visible" | "hidden";

type Props = {
  search: string;
  filter: CategoryFilter;
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
  search,
  filter,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(search);

  /*
   * Sync input with URL
   */
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  /*
   * Search debounce
   */
  useEffect(() => {
    const value = searchValue.trim();

    if (value === search) {
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue, search, searchParams, pathname, router]);

  /*
   * Filter
   */
  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: CategoryFilter | null,
  ) => {
    if (!newFilter) return;

    const params = new URLSearchParams(searchParams.toString());

    if (newFilter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", newFilter);
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
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
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
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
