import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import TableDetailsPage from "@/features/dashboard/components/tables/TableDetailsPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <DashboardContainer>
      <TableDetailsPage tableId={id} />
    </DashboardContainer>
  );
}
