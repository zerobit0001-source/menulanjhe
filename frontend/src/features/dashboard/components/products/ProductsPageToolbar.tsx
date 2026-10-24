"use client";

import {
  CircularProgress,
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
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { useGetMenusQuery } from "../../api/menuApi";

const filters = [
  { value: "all", label: "همه" },
  { value: "DISABLED", label: "مخفی" },
  { value: "VISIBLE", label: "دیده" },
] as const;

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
    { menu: activeMenu?.id ?? "" },
    { skip: !activeMenu },
  );

  const categories = useMemo(
    () =>
      [...(categoriesData?.results ?? [])]
        .filter((category) => category.is_active)
        .sort((a, b) => a.sort_order - b.sort_order),
    [categoriesData],
  );

  const selectedCategoryName = useMemo(
    () => categories.find((category) => category.id === selectedCategory)?.name,
    [categories, selectedCategory],
  );

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const trimmedSearch = searchValue.trim();

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

              return selectedCategoryName ?? "دسته‌بندی انتخاب‌شده";
            }}
          >
            <MenuItem value="all">همه دسته‌بندی‌ها</MenuItem>

            {isMenusLoading || isCategoriesLoading ? (
              <MenuItem disabled>
                <CircularProgress size={18} />
                <span className="mr-2">در حال بارگذاری...</span>
              </MenuItem>
            ) : isMenusError || isCategoriesError ? (
              <MenuItem disabled>خطا در دریافت دسته‌بندی‌ها</MenuItem>
            ) : categories.length === 0 ? (
              <MenuItem disabled>دسته‌بندی فعالی وجود ندارد</MenuItem>
            ) : (
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))
            )}
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
