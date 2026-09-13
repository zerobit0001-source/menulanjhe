import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import TablesPageAddTableButton from "@/features/dashboard/components/tables/TablesPageAddTableButton";
import TablesPageTableList from "@/features/dashboard/components/tables/TablesPageTableList";
import { Typography } from "@mui/material";
import { BetweenVerticalEnd } from "lucide-react";

export default function TablesPage() {
  return (
    <DashboardContainer>
      <SectionTitle
        title="میزها"
        icon={<BetweenVerticalEnd size={20} className="text-gray-400" />}
      >
        <TablesPageAddTableButton />
      </SectionTitle>
      <TablesPageTableList />
    </DashboardContainer>
  );
}
