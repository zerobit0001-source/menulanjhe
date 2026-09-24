import EditCategoryPage from "@/features/dashboard/components/categories/edit/EditCategoryPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditCategoryPage id={id} />;
}
