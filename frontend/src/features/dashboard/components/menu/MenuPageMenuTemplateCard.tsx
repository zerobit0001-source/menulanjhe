"use client";

import { Check, Eye } from "lucide-react";
import { Button, Card, Typography } from "@mui/material";
import { MenuTemplate } from "../../types/menu/menu.type";

type Props = {
  template: MenuTemplate;
  selected: boolean;
  onSelect: (template: MenuTemplate) => void;
  onPreview: (template: MenuTemplate) => void;
};

export default function MenuPageMenuTemplateCard({
  template,
  selected,
  onSelect,
  onPreview,
}: Props) {
  return (
    <Card
      elevation={0}
      className={`overflow-hidden rounded-2xl! border! transition-all ${
        selected
          ? "border-gray-900! shadow-sm"
          : "border-gray-200! hover:border-gray-300!"
      }`}
    >
      {/* Preview */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-100">
        {template.preview ? (
          <img
            src={template.preview}
            alt={template.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <div className="w-36 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="mt-3 h-20 rounded-xl bg-gray-100" />
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full rounded bg-gray-100" />
                <div className="h-2 w-3/4 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        )}

        {/* Selected */}
        {selected && (
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
            <Check size={15} />
          </div>
        )}

        {/* Preview button */}
        <button
          type="button"
          onClick={() => onPreview(template)}
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Eye size={14} />
          پیش‌نمایش
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Typography className="font-bold! text-gray-900!">
          {template.name}
        </Typography>

        <Typography className="mt-1! line-clamp-2 text-xs! text-gray-400!">
          {template.description}
        </Typography>

        <Button
          fullWidth
          variant={selected ? "contained" : "outlined"}
          onClick={() => onSelect(template)}
          disabled={selected}
          className="mt-4 rounded-xl!"
        >
          {selected ? "قالب فعال" : "انتخاب قالب"}
        </Button>
      </div>
    </Card>
  );
}
