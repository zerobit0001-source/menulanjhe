import { Typography } from "@mui/material";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const SectionTitle = ({
  title,
  icon,
  count,
  link,
  linkText,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  link?: string;
  linkText?: string;
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <Typography variant="h6" className="font-light!">
          {title}
        </Typography>
        {count !== undefined && (
          <span className="bg-gray-200/50 size-8 flex items-center justify-center text-sm rounded-full">
            {count}
          </span>
        )}
      </div>
      {link && (
        <Link
          href={link}
          className="flex items-center gap-1 text-sm text-blue-500 hover:underline hover:text-blue-600 transition-all"
        >
          {linkText} <ChevronLeft size={20} />{" "}
        </Link>
      )}
    </div>
  );
};
