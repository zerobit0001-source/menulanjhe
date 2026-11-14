import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { menuTemplates } from "@/features/dashboard/data/menu/demoMenu";
import MenuRenderer from "@/features/menu/MenuRenderer";
import { demoMenu } from "@/features/menu/data/demoMenu";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PreviewMenuPage({ params }: Props) {
  const { slug } = await params;


  if (!menuTemplates.some((template) => template.id === slug)) {
    return (
      <div className="w-full p-4 flex items-center justify-center">
        <Typography variant="body1">قالب پیدا نشد</Typography>
      </div>
    );
  }

  return (
    <div className="w-full md:w-xl mx-auto flex items-center justify-center h-[70%]! overflow-scroll! scrollbar-none relative">
      <Button
        variant="contained"
        size="small"
        className="absolute! z-999 top-4 "
      >
        <Link href="/dashboard/menu" className="flex items-center gap-1">
          <Typography variant="body2">بازگشت</Typography>
        </Link>
      </Button>
      <MenuRenderer template={slug} menu={demoMenu} />
    </div>
  );
}
