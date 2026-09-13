"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Link2 } from "lucide-react";
import { Button, Card, IconButton, Typography } from "@mui/material";

type Props = {
  menuUrl: string;
  isPublished: boolean;
};

export default function MenuPageMenuLinkCard({ menuUrl, isPublished }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.error("Failed to copy menu URL");
    }
  };

  const handleOpen = () => {
    window.open(menuUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      elevation={0}
      className="rounded-2xl! border border-gray-200! bg-white! p-4!"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
          <Link2 size={19} className="text-gray-600" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Typography className="font-bold! text-gray-900!">
              لینک منوی شما
            </Typography>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isPublished
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {isPublished ? "منتشر شده" : "منتشر نشده"}
            </span>
          </div>

          <Typography className="mt-1! text-xs! text-gray-400!">
            این لینک را با مشتریان خود به اشتراک بگذارید.
          </Typography>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3">
          <span
            dir="ltr"
            className="min-w-0 flex-1 truncate text-left text-xs text-gray-500"
          >
            {menuUrl}
          </span>

          <IconButton
            size="small"
            onClick={handleCopy}
            className="shrink-0 text-gray-400!"
          >
            {copied ? (
              <Check size={17} className="text-green-500" />
            ) : (
              <Copy size={17} />
            )}
          </IconButton>
        </div>

        <Button
          variant="outlined"
          onClick={handleOpen}
          endIcon={<ExternalLink size={16} />}
          className="rounded-xl! sm:min-w-28"
        >
          مشاهده
        </Button>
      </div>

      {copied && (
        <p className="mt-2 text-xs text-green-500">لینک با موفقیت کپی شد.</p>
      )}
    </Card>
  );
}
