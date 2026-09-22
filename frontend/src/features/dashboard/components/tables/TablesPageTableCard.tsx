"use client";

import Link from "next/link";
import { useState } from "react";
import { Edit3, Eye, Users } from "lucide-react";

import type { Table } from "@/features/dashboard/types/tables/tables.type";
import { useUpdateTableMutation } from "@/features/dashboard/api/tableApi";

import TablesPageTableModal from "./TablesPageTableModal";

type Props = {
  table: Table;
};

export default function TablesPageTableCard({ table }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const [updateTable, { isLoading: isUpdating }] = useUpdateTableMutation();

  const handleUpdate = async (data: {
    name: string;
    number: number;
    capacity: number;
  }) => {
    try {
      await updateTable({
        id: table.id,
        body: {
          name: data.name.trim(),
          number: data.number,
          capacity: data.capacity,
        },
      }).unwrap();

      setEditOpen(false);
    } catch (error) {
      console.error("Update table failed:", error);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        {/* Header */}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-400">میز</p>

            <h3 className="mt-1 truncate text-lg font-black text-gray-900">
              {table.name}
            </h3>
          </div>

          <span
            className={
              table.is_active
                ? "shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600"
                : "shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-500"
            }
          >
            {table.is_active ? "فعال" : "غیرفعال"}
          </span>
        </div>

        {/* Info */}

        <div className="mt-5 flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
              {table.number}
            </span>

            <span>شماره میز</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <Users size={16} />
            </span>

            <span>{table.capacity} نفر</span>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            disabled={isUpdating}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-gray-100 text-sm font-bold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Edit3 size={16} />
            ویرایش
          </button>

          <Link
            href={`/dashboard/tables/${table.id}`}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-bold text-white transition hover:opacity-90"
          >
            <Eye size={16} />
            جزئیات
          </Link>
        </div>
      </div>

      <TablesPageTableModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        table={table}
        onSubmit={handleUpdate}
        isSubmitting={isUpdating}
      />
    </>
  );
}
