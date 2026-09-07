import type { MenuData } from "./types/menu.types";
import ModernMenu from "./templates/ModernMenu";

const menuTemplates = {
  modern: ModernMenu,
};

type MenuTemplate = keyof typeof menuTemplates;

type MenuRendererProps = {
  template: MenuTemplate;
  menu: MenuData;
};

export default function MenuRenderer({
  template,
  menu,
}: MenuRendererProps) {
  const Template = menuTemplates[template];

  return <Template menu={menu} />;
}