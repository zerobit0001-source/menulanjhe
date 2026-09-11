"use client";

import { ExternalLink } from "lucide-react";
import { Button, Typography } from "@mui/material";

type Props = {
  menuUrl: string;
};

export default function MenuPageMenuHeader({ menuUrl }: Props) {
  const handleOpenMenu = () => {
    window.open(menuUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Typography variant="h5" className="font-bold! text-gray-900!">
          منو
        </Typography>

        <Typography className="mt-1! text-sm! text-gray-500!">
          منوی دیجیتال خود را مدیریت و شخصی‌سازی کنید.
        </Typography>
      </div>

      <Button
        variant="outlined"
        onClick={handleOpenMenu}
        startIcon={<ExternalLink size={17} />}
        className="w-full rounded-xl! sm:w-auto"
      >
        مشاهده منوی آنلاین
      </Button>
    </div>
  );
}
