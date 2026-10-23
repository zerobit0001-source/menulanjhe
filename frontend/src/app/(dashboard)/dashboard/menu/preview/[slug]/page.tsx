import { menuTemplates } from "@/features/dashboard/data/menu/demoMenu";
import MenuRenderer from "@/features/menu/MenuRenderer";
import { demoMenu } from "@/features/menu/data/demoMenu";
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
    notFound();
  }

  return <MenuRenderer template={slug} menu={demoMenu} />;
}
