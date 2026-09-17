import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import OrdersPageClient from "./OrdersPageClient";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import { SquareText } from "lucide-react";

export default function OrderPage() {
  return (
    <DashboardContainer>
      <OrdersPageClient />
    </DashboardContainer>
  );
}
