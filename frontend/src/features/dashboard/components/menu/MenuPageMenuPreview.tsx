"use client";

import { ExternalLink } from "lucide-react";
import { Button, Card, Typography } from "@mui/material";

import MenuRenderer from "@/features/menu/MenuRenderer";
import type { MenuData } from "@/features/menu/types/menu.types";

type Props = {
  menu: MenuData;
  template: string;
  menuUrl: string;
};

export default function MenuPageMenuPreview({
  menu,
  template,
  menuUrl,
}: Props) {
  const handleOpenMenu = () => {
    window.open(menuUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      elevation={0}
      className="overflow-hidden rounded-2xl! border border-gray-200! bg-white!"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography className="font-bold! text-gray-900!">
            پیش‌نمایش منو
          </Typography>

          <Typography className="mt-1! text-xs! text-gray-400!">
            نمایی از منوی فعلی مشتریان
          </Typography>
        </div>

        <Button
          variant="outlined"
          size="small"
          endIcon={<ExternalLink size={15} />}
          onClick={handleOpenMenu}
          className="rounded-xl!"
        >
          مشاهده کامل
        </Button>
      </div>

      {/* Preview */}
      <div className="bg-gray-100 p-4 sm:p-8">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="max-h-[650px] overflow-y-auto">
            <MenuRenderer menu={menu} template={template} />
          </div>
        </div>
      </div>
    </Card>
  );
}
