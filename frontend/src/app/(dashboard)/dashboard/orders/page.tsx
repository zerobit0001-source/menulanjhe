import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import OrderPageOrdersList from "@/features/dashboard/components/orders/OrderPageOrdersList";
import OrdersPageToolbar from "@/features/dashboard/components/orders/OrdersPageToolbar";
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
      <OrdersPageToolbar />
      <OrderPageOrdersList />
    </DashboardContainer>
  );
}
