"use client";

import {
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filters = [
  { value: "all", label: "همه" },
  { value: "DISABLED", label: "مخفی" },
  { value: "VISIBLE", label: "دیده" },
];

type Category = {
  id: string;
  menu: string;
  name: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
};

// Fake data — بعداً با API جایگزین کن.
const mockCategories: Category[] = [
  {
    id: "256686d5-9797-4c87-8819-190601cac5eb",
    menu: "2a2c7d52-fd2f-4b7f-a2ef-8788954f88d2",
    name: "قهوه",
    icon_name: "coffee",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "a8b8c8d1-4e23-4a6b-9d71-123456789001",
    menu: "2a2c7d52-fd2f-4b7f-a2ef-8788954f88d2",
    name: "نوشیدنی سرد",
    icon_name: "glass-water",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "a8b8c8d1-4e23-4a6b-9d71-123456789002",
    menu: "2a2c7d52-fd2f-4b7f-a2ef-8788954f88d2",
    name: "چای و دمنوش",
    icon_name: "coffee",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "a8b8c8d1-4e23-4a6b-9d71-123456789003",
    menu: "2a2c7d52-fd2f-4b7f-a2ef-8788954f88d2",
    name: "کیک و دسر",
    icon_name: "cake",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "a8b8c8d1-4e23-4a6b-9d71-123456789004",
    menu: "2a2c7d52-fd2f-4b7f-a2ef-8788954f88d2",
    name: "غیرفعال",
    icon_name: "folder",
    sort_order: 4,
    is_active: false,
  },
];

type Props = {
  search: string;
  filter: "all" | "DISABLED" | "VISIBLE";
};

export default function ProductsPageToolbar({ search, filter }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";

  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const trimmedSearch = searchValue.trim();

    // اگر مقدار جست‌وجو با URL یکی است، نیازی به navigation نیست.
    if (trimmedSearch === (searchParams.get("search") ?? "")) {
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      params.delete("page");

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, pathname, router, searchParams]);

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    if (newFilter === null) return;
    updateQueryParam("filter", newFilter);
  };

  const handleCategoryChange = (value: string) => {
    updateQueryParam("category", value);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row">
        {/* Search */}
        <Paper
          elevation={0}
          className="flex h-10 min-w-0 flex-1 items-center gap-2 border border-gray-200! px-3 sm:max-w-md"
        >
          <Search size={19} className="shrink-0 text-gray-400" />

          <InputBase
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="جستجوی محصول..."
            className="flex-1 text-sm!"
            fullWidth
            inputProps={{ "aria-label": "جستجوی محصول" }}
          />

          {searchValue && (
            <IconButton
              size="small"
              aria-label="پاک کردن جستجو"
              onClick={() => setSearchValue("")}
            >
              <X size={16} />
            </IconButton>
          )}
        </Paper>

        {/* Category select */}
        <Paper
          elevation={0}
          className="flex h-10 w-full items-center border border-gray-200! px-2 sm:w-52"
        >
          <Select
            fullWidth
            displayEmpty
            size="small"
            value={selectedCategory}
            onChange={(event) => handleCategoryChange(event.target.value)}
            variant="standard"
            disableUnderline
            inputProps={{ "aria-label": "انتخاب دسته‌بندی" }}
            renderValue={(value) => {
              if (value === "all") {
                return (
                  <Typography variant="caption" color="text.secondary">
                    همه دسته‌بندی‌ها
                  </Typography>
                );
              }

              const category = mockCategories.find((item) => item.id === value);

              return category?.name ?? "دسته‌بندی انتخاب‌شده";
            }}
          >
            <MenuItem value="all">همه دسته‌بندی‌ها</MenuItem>

            {mockCategories
              .filter((category) => category.is_active)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </Paper>
      </div>

      {/* Visibility filter */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="فیلتر محصولات"
        size="small"
        className="self-start sm:self-auto"
      >
        {filters.map((item) => (
          <ToggleButton key={item.value} value={item.value}>
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
