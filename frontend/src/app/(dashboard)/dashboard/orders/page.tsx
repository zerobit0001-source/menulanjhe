import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import OrdersPageClient from "./OrdersPageClient";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import { SquareText } from "lucide-react";

interface OrdersPageProps {
  searchParams: Promise<{
    search?: string;
    filter?: "all" | "DISABLED" | "VISIBLE";
    page?: string;
    category?: string;
  }>;
}

export default async function OrderPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  return (
    <DashboardContainer>
      <OrdersPageClient search={search} />
    </DashboardContainer>
  );
}
