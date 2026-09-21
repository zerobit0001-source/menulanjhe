"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

import type { Table } from "../../types/tables/tables.type";

type TableModalProps = {
  open: boolean;
  table?: Table | null;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    number: number;
    capacity: number;
  }) => void;
  isSubmitting?: boolean;
};

const defaultValues = {
  name: "",
  number: "",
  capacity: "",
};

export default function TablesPageTableModal({
  open,
  table,
  onClose,
  onSubmit,
  isSubmitting = false,
}: TableModalProps) {
  const isEdit = Boolean(table);

  const [name, setName] = useState(defaultValues.name);
  const [number, setNumber] = useState(defaultValues.number);
  const [capacity, setCapacity] = useState(defaultValues.capacity);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (table) {
      setName(table.name);
      setNumber(String(table.number));
      setCapacity(String(table.capacity));
      return;
    }

    setName(defaultValues.name);
    setNumber(defaultValues.number);
    setCapacity(defaultValues.capacity);
  }, [open, table]);

  const parsedNumber = Number(number);
  const parsedCapacity = Number(capacity);

  const isValid =
    name.trim().length > 0 &&
    Number.isInteger(parsedNumber) &&
    parsedNumber > 0 &&
    Number.isInteger(parsedCapacity) &&
    parsedCapacity > 0;

  const handleSubmit = () => {
    if (!isValid || isSubmitting) {
      return;
    }

    onSubmit({
      name: name.trim(),
      number: parsedNumber,
      capacity: parsedCapacity,
    });
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

          <IconButton
            size="small"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400!"
          >
            <X size={19} />
          </IconButton>
        </div>

        {/* Form */}

        <div className="space-y-5 py-6">
          {/* Name */}

          <div>
            <Typography className="mb-2! text-sm! font-semibold! text-gray-700!">
              نام میز
            </Typography>

            <TextField
              fullWidth
              size="small"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="مثلاً میز VIP"
              disabled={isSubmitting}
            />
          </div>

          {/* Number */}

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
              placeholder="مثلاً ۱"
              disabled={isSubmitting}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
            />
          </div>

          {/* Capacity */}

          <div>
            <Typography className="mb-2! text-sm! font-semibold! text-gray-700!">
              ظرفیت میز
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="number"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
              placeholder="مثلاً ۴"
              disabled={isSubmitting}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
            />
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl!"
          >
            انصراف
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="rounded-xl!"
          >
            {isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : isEdit ? (
              "ذخیره تغییرات"
            ) : (
              "افزودن میز"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}