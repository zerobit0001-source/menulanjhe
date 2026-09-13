export type DashboardMenu = {
  id: string;
  shop_name: string;
  slug: string;
  active_template: string;
  is_published: boolean;
  updated_at: string;
};
export type MenuTemplate = {
  id: string;
  name: string;
  description: string;
  preview: string;
  available: boolean;
};
