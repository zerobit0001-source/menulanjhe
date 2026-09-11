import type { MenuData } from "./types/menu.types";
import ModernMenu from "./templates/ModernMenu";
import Template001 from "./templates/Template001";

const menuTemplates = {
  modern: ModernMenu,
  template_001: Template001,
};

type MenuTemplate = keyof typeof menuTemplates;

type MenuRendererProps = {
  template: MenuTemplate;
  menu: MenuData;
};

export default function MenuRenderer({ template, menu }: MenuRendererProps) {
  const Template = menuTemplates[template];

  return <Template menu={menu} />;
}
