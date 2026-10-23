import { menuTemplates } from "@/features/dashboard/data/menu/demoMenu";
import MenuRenderer from "@/features/menu/MenuRenderer";
import { demoMenu } from "@/features/menu/data/demoMenu";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PreviewMenuPage({ params }: Props) {
  const { slug } = await params;

  console.log(slug);

  if (!menuTemplates.some((template) => template.id === slug)) {
    return (
      <div className="w-full p-4 flex items-center justify-center">
        <Typography variant="body1">قالب پیدا نشد</Typography>
      </div>
    );
  }

  return <MenuRenderer template={slug} menu={demoMenu} />;
}
