"use client";

import {
  IconButton,
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";
import type { OrderStatus } from "../../types/orders/orders.types";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterValue = "ALL" | OrderStatus;

type Props = {
  filter: FilterValue;
  search: string;
  onFilterChange: (filter: FilterValue) => void;
  onSearchChange: (value: string) => void;
};

const filters: {
  value: FilterValue;
  label: string;
}[] = [
  {
    value: "ALL",
    label: "همه",
  },
  {
    value: "PENDING",
    label: "در انتظار تأیید",
  },
  {
    value: "CONFIRMED",
    label: "تأیید شده",
  },
  {
    value: "COMPLETED",
    label: "تکمیل شده",
  },
  {
    value: "CANCELLED",
    label: "لغو شده",
  },
];

export default function OrdersPageToolbar({
  filter,
  search,
  onFilterChange,
}: Props) {
  const handleFilter = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: FilterValue | null,
  ) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };
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

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <Paper
          elevation={0}
          className="flex h-10 min-w-0 flex-1 items-center gap-2 border border-gray-200! px-3 sm:w-64 sm:flex-none"
        >
          <Search size={19} className="shrink-0 text-gray-400" />

          <InputBase
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="جستجوی سفارش..."
            className="flex-1 text-sm!"
            fullWidth
          />
        </Paper>

        <IconButton>
          <SlidersHorizontal size={20} />
        </IconButton>
      </div>

      <div className="overflow-x-auto">
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilter}
          aria-label="فیلتر سفارش‌ها"
          size="small"
        >
          {filters.map((item) => (
            <ToggleButton
              key={item.value}
              value={item.value}
              className="whitespace-nowrap!"
            >
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
