import { DashboardMenu, MenuTemplate } from "../../types/menu/menu.type";

export const dashboardMenu: DashboardMenu = {
  id: "menu_001",
  shop_name: "کافه لانژه",
  slug: "cafe-lanjhe",
  active_template: "template_001",
  is_published: true,
  updated_at: "2026-09-11T18:30:00",
};

export const menuTemplates: MenuTemplate[] = [
  {
    id: "template_001",
    name: "مدرن",
    description: "طراحی مدرن و مناسب کافه و رستوران",
    preview: "",
    available: true,
  },
  {
    id: "template_002",
    name: "کلاسیک",
    description: "طراحی ساده و کلاسیک",
    preview: "",
    available: true,
  },
  {
    id: "template_003",
    name: "مینیمال",
    description: "طراحی مینیمال و ساده",
    preview: "",
    available: true,
  },
];
