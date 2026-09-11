import MenuRenderer from "@/features/menu/MenuRenderer";
import { demoMenu } from "@/features/menu/data/demoMenu";

export default function MenuPage() {
  return <MenuRenderer template="template_001" menu={demoMenu} />;
}
