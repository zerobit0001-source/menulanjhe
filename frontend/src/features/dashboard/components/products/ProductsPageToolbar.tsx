"use client";

import {
  IconButton,
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filters = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "DISABLED",
    label: "مخفی",
  },
  {
    value: "VISIBLE",
    label: "دیده",
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

  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }

      const queryString = params.toString();

      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, pathname, router]);

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    if (newFilter === null) return;

    const params = new URLSearchParams(searchParams.toString());

    if (newFilter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", newFilter);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1">
        <Paper
          elevation={0}
          className="flex h-10 max-w-md flex-1 items-center gap-2 border border-gray-200! px-3"
        >
          <Search size={19} className="shrink-0 text-gray-400" />

          <InputBase
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="جستجوی محصول..."
            className="flex-1 text-sm!"
            fullWidth
          />
        </Paper>

        <IconButton>
          <SlidersHorizontal size={20} />
        </IconButton>
      </div>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="فیلتر محصولات"
        size="small"
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
