"use client";

import { useState } from "react";
import {
  MoreVertical,
  Pencil,
  QrCode,
  Trash2,
  Utensils,
} from "lucide-react";
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { DashboardTable, TableStatus } from "../../types/tables/tables.type";


type Props = {
  table: DashboardTable;
  onEdit: (table: DashboardTable) => void;
  onDelete: (table: DashboardTable) => void;
  onShowQr: (table: DashboardTable) => void;
};

const statusConfig: Record<
  TableStatus,
  {
    label: string;
    className: string;
    dot: string;
  }
> = {
  AVAILABLE: {
    label: "آزاد",
    className: "bg-green-50 text-green-600",
    dot: "bg-green-500",
  },
  ORDERING: {
    label: "در حال سفارش",
    className: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
  WAITING_PAYMENT: {
    label: "در انتظار پرداخت",
    className: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
  },
};

export default function TablesPageTableCard({
  table,
  onEdit,
  onDelete,
  onShowQr,
}: Props) {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);
  const status = statusConfig[table.status];

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      elevation={0}
      className="rounded-2xl! border border-gray-200! bg-white! p-4!"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
          <Utensils size={20} />
        </div>

        <IconButton
          size="small"
          onClick={handleMenuOpen}
          className="text-gray-400!"
        >
          <MoreVertical size={19} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              className: "mt-2! rounded-xl!",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onShowQr(table);
            }}
            className="gap-2! text-sm!"
          >
            <QrCode size={16} />
            مشاهده QR
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleMenuClose();
              onEdit(table);
            }}
            className="gap-2! text-sm!"
          >
            <Pencil size={16} />
            ویرایش
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleMenuClose();
              onDelete(table);
            }}
            className="gap-2! text-sm! text-red-500!"
          >
            <Trash2 size={16} />
            حذف
          </MenuItem>
        </Menu>
      </div>

      <div className="mt-4">
        <Typography className="text-lg! font-bold! text-gray-900!">
          میز {table.number.toLocaleString("fa-IR")}
        </Typography>

        <div
          className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
          />

          {status.label}
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">
            سفارش فعال
          </span>

          <span className="font-semibold text-gray-700">
            {table.active_order_count.toLocaleString("fa-IR")}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onShowQr(table)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
      >
        <QrCode size={16} />
        مشاهده QR میز
      </button>
    </Card>
  );
}