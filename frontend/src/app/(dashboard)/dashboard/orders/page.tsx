import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import OrdersPageClient from "./OrdersPageClient";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import { SquareText } from "lucide-react";

export default function OrderPage() {
  return (
    <DashboardContainer>
      <SectionTitle
        title="سفارش ها"
        icon={<SquareText size={20} className="text-gray-500" />}
        count={13}
      />

      <OrdersPageClient />
    </DashboardContainer>
  );
}
