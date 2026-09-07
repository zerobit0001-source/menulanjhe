import { Typography } from "@mui/material";

export const SectionTitle = ({
  title,
  icon,
  count,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
}) => {
  return (
    <div className="w-full flex items-center gap-2">
      {icon}
      <Typography variant="h6" className="font-light!">{title}</Typography>
      {count !== undefined && (
        <span className="bg-gray-200/50 size-8 flex items-center justify-center text-sm rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};
