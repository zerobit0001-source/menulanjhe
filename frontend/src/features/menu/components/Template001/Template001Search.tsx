"use client";

import { Search, X } from "lucide-react";
import { IconButton, InputBase, Paper } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Template001Search({ value, onChange }: Props) {
  return (
    <div className="px-4 pt-4">
      <Paper
        elevation={0}
        className="mx-auto flex h-11 max-w-2xl items-center gap-2 rounded-xl! border border-gray-200! bg-gray-50! px-2"
      >
        <Search size={19} className="shrink-0 text-gray-400" />

        <InputBase
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="جستجوی محصولات..."
          fullWidth
          className="text-sm!"
        />

        {value && (
          <IconButton size="small" onClick={() => onChange("")}>
            <X size={17} />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}
