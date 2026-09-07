export default function DashboardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-full flex-col gap-8 p-4">{children}</div>;
}
