"use client";

import { useState } from "react";
import { Edit3, QrCode, Users } from "lucide-react";

import type { Table } from "@/features/dashboard/types/tables/tables.type";

import TablesPageTableModal from "./TablesPageTableModal";

type Props = {
  table: Table;
};

export default function TablesPageTableCard({ table }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400">میز</p>

            <h3 className="mt-1 text-lg font-black text-gray-900">
              {table.name}
            </h3>
          </div>

          <span
            className={
              table.is_active
                ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600"
                : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-500"
            }
          >
            {table.is_active ? "فعال" : "غیرفعال"}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <QrCode size={17} />
            میز {table.number}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={17} />
            {table.capacity} نفر
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
          >
            <Edit3 size={16} />
            ویرایش
          </button>

          <a
            href={table.public_url}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-bold text-white transition hover:opacity-90"
          >
            <QrCode size={16} />
            مشاهده QR
          </a>
        </div>
      </div>

      <TablesPageTableModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        table={table}
      />
    </>
  );
}
