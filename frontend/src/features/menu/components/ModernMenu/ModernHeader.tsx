import { Avatar, IconButton } from "@mui/material";
import { Search } from "lucide-react";
import type { MenuData } from "../../types/menu.types";

type ModernHeaderProps = {
  shop: MenuData["shop"];
};

export default function ModernHeader({ shop }: ModernHeaderProps) {
  return (
    <header className="px-5 pt-6 pb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={shop.logo}
            alt={shop.name}
            sx={{
              width: 48,
              height: 48,
            }}
          >
            {shop.name.charAt(0)}
          </Avatar>

          <div>
            <h1 className="text-lg font-bold text-zinc-900">{shop.name}</h1>

            {shop.description && (
              <p className="mt-1 text-xs text-zinc-500">{shop.description}</p>
            )}
          </div>
        </div>

        <IconButton
          aria-label="جستجو"
          size="small"
          sx={{
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Search size={19} strokeWidth={1.8} />
        </IconButton>
      </div>
    </header>
  );
}
