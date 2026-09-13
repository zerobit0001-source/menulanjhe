"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { DashboardTable, TableStatus } from "../../types/tables/tables.type";

type TableModalProps = {
  open: boolean;
  table?: DashboardTable | null;
  onClose: () => void;
  onSubmit: (data: Pick<DashboardTable, "number" | "status">) => void;
};

const defaultValues = {
  number: "",
  status: "AVAILABLE" as TableStatus,
};

const statusOptions: {
  value: TableStatus;
  label: string;
}[] = [
  {
    value: "AVAILABLE",
    label: "آزاد",
  },
  {
    value: "ORDERING",
    label: "در حال سفارش",
  },
  {
    value: "WAITING_PAYMENT",
    label: "در انتظار پرداخت",
  },
];

export default function TablesPageTableModal({
  open,
  table,
  onClose,
  onSubmit,
}: TableModalProps) {
  const isEdit = Boolean(table);

  const [number, setNumber] = useState("");
  const [status, setStatus] = useState<TableStatus>(defaultValues.status);

  useEffect(() => {
    if (table) {
      setNumber(String(table.number));
      setStatus(table.status);
      return;
    }

    setNumber(defaultValues.number);
    setStatus(defaultValues.status);
  }, [table, open]);

  const handleSubmit = () => {
    const parsedNumber = Number(number);

    if (!Number.isInteger(parsedNumber) || parsedNumber <= 0) {
      return;
    }

    onSubmit({
      number: parsedNumber,
      status,
    });

    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/40 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <Card
        elevation={0}
        className="w-full max-w-md rounded-2xl! border border-gray-200! bg-white! p-5!"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div>
            <Typography className="font-bold! text-gray-900!">
              {isEdit ? "ویرایش میز" : "افزودن میز"}
            </Typography>

            <Typography className="mt-1! text-xs! text-gray-400!">
              {isEdit
                ? "اطلاعات میز را ویرایش کنید."
                : "یک میز جدید به رستوران خود اضافه کنید."}
            </Typography>
          </div>

          <IconButton size="small" onClick={onClose} className="text-gray-400!">
            <X size={19} />
          </IconButton>
        </div>

        {/* Form */}
        <div className="space-y-5 py-6">
          {/* Table number */}
          <div>
            <Typography className="mb-2! text-sm! font-semibold! text-gray-700!">
              شماره میز
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="مثلاً ۱۲"
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
            />
          </div>

          {/* Status */}
          <div>
            <Typography className="mb-2! text-sm! font-semibold! text-gray-700!">
              وضعیت میز
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as TableStatus)
                }
              >
                {statusOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <Button variant="outlined" onClick={onClose} className="rounded-xl!">
            انصراف
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !number ||
              Number(number) <= 0 ||
              !Number.isInteger(Number(number))
            }
            className="rounded-xl!"
          >
            {isEdit ? "ذخیره تغییرات" : "افزودن میز"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
