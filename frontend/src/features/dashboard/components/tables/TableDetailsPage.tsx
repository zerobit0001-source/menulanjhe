"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import {
  ArrowRight,
  Copy,
  ExternalLink,
  QrCode,
  RefreshCw,
  Users,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import {
  useGetTableQuery,
  useRegenerateTableTokenMutation,
} from "../../api/tableApi";

type Props = {
  tableId: string;
};

export default function TableDetailsPage({ tableId }: Props) {
  const [copied, setCopied] = useState(false);

  const { data: table, isLoading, isError } = useGetTableQuery(tableId);

  const [regenerateTableToken, { isLoading: isRegenerating }] =
    useRegenerateTableTokenMutation();

  const handleCopy = async () => {
    if (!table?.public_url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(table.public_url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleDownload = () => {
    const svg = document.getElementById("table-qr-code");

    if (!svg) {
      return;
    }

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const svgBlob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `table-${table?.number}-qr.svg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleRegenerateToken = async () => {
    if (!table) {
      return;
    }

    const confirmed = window.confirm(
      "با تولید QR جدید، QR قبلی دیگر قابل استفاده نخواهد بود. ادامه می‌دهید؟",
    );

    if (!confirmed) {
      return;
    }

    try {
      await regenerateTableToken(table.id).unwrap();
    } catch (error) {
      console.error("Regenerate table token failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <CircularProgress size={28} />
      </div>
    );
  }

  if (isError || !table) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="text-sm font-bold text-red-500">
          دریافت اطلاعات میز با خطا مواجه شد.
        </p>

        <Link
          href="/dashboard/tables"
          className="mt-4 text-sm font-semibold text-gray-600 transition hover:text-gray-900"
        >
          بازگشت به میزها
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/tables"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
          >
            <ArrowRight size={18} />
          </Link>

          <div>
            <p className="text-xs text-gray-400">جزئیات میز</p>

            <h1 className="mt-1 text-xl font-black text-gray-900">
              {table.name}
            </h1>
          </div>
        </div>

        <span
          className={
            table.is_active
              ? "w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600"
              : "w-fit rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500"
          }
        >
          {table.is_active ? "فعال" : "غیرفعال"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        {/* Table Information */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Users size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900">اطلاعات میز</h2>

              <p className="mt-0.5 text-xs text-gray-400">
                اطلاعات اصلی این میز
              </p>
            </div>
          </div>

          {/* Basic Info */}

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <InfoItem label="نام میز" value={table.name} />

            <InfoItem label="شماره میز" value={String(table.number)} />

            <InfoItem label="ظرفیت" value={`${table.capacity} نفر`} />
          </div>

          {/* Public URL */}

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold text-gray-500">
              لینک عمومی میز
            </p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p
                  dir="ltr"
                  className="truncate text-left text-sm text-gray-600"
                  title={table.public_url}
                >
                  {table.public_url}
                </p>
              </div>

              <Button
                variant="outlined"
                onClick={handleCopy}
                startIcon={<Copy size={16} />}
                className="rounded-xl!"
              >
                {copied ? "کپی شد" : "کپی لینک"}
              </Button>
            </div>
          </div>

          {/* Open Public URL */}

          <a
            href={table.public_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-bold text-white transition hover:opacity-90"
          >
            <ExternalLink size={16} />
            باز کردن لینک میز
          </a>
        </div>

        {/* QR */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <QrCode size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900">QR Code میز</h2>

              <p className="mt-0.5 text-xs text-gray-400">QR مخصوص این میز</p>
            </div>
          </div>

          {/* QR */}

          <div className="flex flex-col items-center pt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <QRCodeSVG
                id="table-qr-code"
                value={table.public_url}
                size={220}
                level="H"
                marginSize={2}
              />
            </div>

            <p className="mt-4 text-sm font-bold text-gray-800">
              میز {table.number}
            </p>

            <p className="mt-1 text-xs text-gray-400">{table.name}</p>

            {/* QR Actions */}

            <div className="mt-5 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                variant="contained"
                onClick={handleDownload}
                startIcon={<QrCode size={17} />}
                className="rounded-xl!"
              >
                دانلود QR
              </Button>

              <Button
                variant="outlined"
                onClick={handleRegenerateToken}
                disabled={isRegenerating}
                startIcon={
                  isRegenerating ? (
                    <CircularProgress size={16} />
                  ) : (
                    <RefreshCw size={17} />
                  )
                }
                className="rounded-xl!"
              >
                {isRegenerating ? "در حال تولید..." : "تولید QR جدید"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs text-gray-400">{label}</p>

      <p className="mt-2 text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}
