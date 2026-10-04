"use client";

import { MenuItem, Select } from "@mui/material";
import { ReportsPeriod } from "../../types/reports/reports.types";

const PERIODS: { value: ReportsPeriod; label: string }[] = [
  { value: "today", label: "امروز" },
  { value: "week", label: "این هفته" },
];

type Props = {
  period: ReportsPeriod;
  onPeriodChange: (period: ReportsPeriod) => void;
};

export default function DashboardReportsHeader({
  period,
  onPeriodChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          گزارش‌ها
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          خلاصه‌ای از وضعیت سفارش‌ها و فروش مجموعه
        </p>
      </div>

      <Select
        size="small"
        value={period}
        onChange={(e) => onPeriodChange(e.target.value as ReportsPeriod)}
        inputProps={{ "aria-label": "بازه گزارش" }}
        sx={{
          minWidth: 148,
          borderRadius: "12px",
          bgcolor: "#fff",
          fontSize: 14,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#CBD5E1",
          },
        }}
      >
        {PERIODS.map((p) => (
          <MenuItem key={p.value} value={p.value} sx={{ fontSize: 14 }}>
            {p.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
