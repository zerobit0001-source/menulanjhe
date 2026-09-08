import { Card, IconButton, Tooltip } from "@mui/material";
import DashboardMenuCategoryFilter from "./DashboardMenuCategoryFilter";
import { ArrowUpNarrowWide, Funnel } from "lucide-react";

export default function DashboardMenuToolbar() {
  return (
    <div className="flex items-center justify-between">
      <DashboardMenuCategoryFilter />
      <Card className="px-4 py-1">
        <Tooltip title="فیلتر">
          <IconButton>
            <Funnel />
          </IconButton>
        </Tooltip>
        <Tooltip title="ترتیب">
          <IconButton>
            <ArrowUpNarrowWide />
          </IconButton>
        </Tooltip>
      </Card>
    </div>
  );
}
