import type { MenuData } from "./types/menu.types";
import ModernMenu from "./templates/ModernMenu";
import Template001 from "./templates/Template001";
import Template002 from "./templates/Template002";
import Template003 from "./templates/Template003";

const menuTemplates = {
  modern: ModernMenu,
  template001: Template001,
  template002: Template002,
  template003: Template003,
  template003: Template003,
};

type MenuTemplate = keyof typeof menuTemplates;

type MenuRendererProps = {
  template: MenuTemplate;
  menu: MenuData;
  qrToken?: string | null;
  tableName?: string | null;
};

export default function MenuRenderer({
  template,
  menu,
  qrToken,
  tableName,
}: MenuRendererProps) {
  const Template = menuTemplates[template];

  return <Template menu={menu} qrToken={qrToken} tableName={tableName} />;
}
