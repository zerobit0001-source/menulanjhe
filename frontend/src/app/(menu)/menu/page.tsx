import MenuRenderer from "@/features/menu/MenuRenderer";
import { demoMenu } from "@/features/menu/data/demoMenu";

export default function MenuPage() {
  return <MenuRenderer template="modern" menu={demoMenu} />;
}
