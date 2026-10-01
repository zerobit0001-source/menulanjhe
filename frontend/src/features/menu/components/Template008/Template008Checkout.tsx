"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Template007Sheet } from "./Template008Sheet";
import { formatToman } from "./utils";

interface Props {
  open: boolean;
  total: number;
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (v: { customerName?: string; notes?: string }) => void;
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "#fff",
    fontFamily: "inherit",
    "& fieldset": { borderColor: "#E5E5E5" },
    "&:hover fieldset": { borderColor: "#A3A3A3" },
    "&.Mui-focused fieldset": { borderColor: "#F5C400" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#171717" },
} as const;

export function Template008Checkout({
  open,
  total,
  submitting,
  error,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <Template007Sheet open={open} title="ثبت سفارش" onClose={onClose}>
      <div className="space-y-4 overflow-y-auto px-5 pb-4">
        <TextField
          label="نام (اختیاری)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          label="توضیحات سفارش (اختیاری)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          sx={fieldSx}
        />
        <p className="rounded-2xl border border-[#E5E5E5] bg-white p-4 text-[13px] leading-6 text-[#737373]">
          پرداخت آنلاین انجام نمی‌شود. پس از ثبت سفارش، برای پرداخت به صندوق
          مراجعه کنید.
        </p>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
      <div className="space-y-3 border-t border-[#E5E5E5] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:rounded-b-[28px]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#737373]">جمع کل</span>
          <span className="text-lg font-bold">{formatToman(total)}</span>
        </div>
        <button
          disabled={submitting}
          onClick={() =>
            onSubmit({
              customerName: name.trim() || undefined,
              notes: notes.trim() || undefined,
            })
          }
          className="h-14 w-full rounded-full bg-[#F5C400] text-[15px] font-bold text-[#171717] active:bg-[#E5B800] disabled:opacity-60"
        >
          {submitting ? "در حال ثبت..." : "ثبت سفارش"}
        </button>
      </div>
    </Template007Sheet>
  );
}
