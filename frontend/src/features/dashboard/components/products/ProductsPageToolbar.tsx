"use client";

import {
  IconButton,
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const filters = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "DISABLED",
    label: "محفی",
  },
  {
    value: "VISIBLE",
    label: "دیده",
  },
];

export default function ProductsPageToolbar() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const handleFilter = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null,
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <Paper
          elevation={0}
          className="flex items-center gap-2 px-3 h-10 border border-gray-200!"
        >
          <Search size={19} className="text-gray-400" />

          <InputBase
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جستجوی محصول..."
            className="flex-1 text-sm!"
            fullWidth
          />
        </Paper>
        <IconButton>
          <SlidersHorizontal />
        </IconButton>
      </div>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilter}
        aria-label="فیلتر محصول ها"
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
