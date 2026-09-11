import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import MenuPageMenuHeader from "@/features/dashboard/components/menu/MenuPageMenuHeader";
import MenuPageMenuLinkCard from "@/features/dashboard/components/menu/MenuPageMenuLinkCard";
import MenuPageMenuPreview from "@/features/dashboard/components/menu/MenuPageMenuPreview";
import MenuPageMenuQrCard from "@/features/dashboard/components/menu/MenuPageMenuQrCard";
import MenuPageMenuTemplateGrid from "@/features/dashboard/components/menu/MenuPageMenuTemplateGrid";
import { SectionTitle } from "@/features/dashboard/components/SectionTitle";
import {
  dashboardMenu,
  menuTemplates,
} from "@/features/dashboard/data/menu/demoMenu";
import { demoMenu } from "@/features/menu/data/demoMenu";
import { SquareMenu } from "lucide-react";

export default function MenuPage() {
  const menuUrl = `/menu/${dashboardMenu.slug}`;

  return (
    <DashboardContainer>
      {/*<SectionTitle
        title="منو"
        icon={<SquareMenu size={20} className="text-gray-400" />}
      />*/}
      <MenuPageMenuHeader menuUrl={menuUrl} />
      <MenuPageMenuPreview
        menu={demoMenu}
        template={dashboardMenu.active_template}
        menuUrl={menuUrl}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MenuPageMenuLinkCard
          menuUrl={menuUrl}
          isPublished={dashboardMenu.is_published}
        />

        <MenuPageMenuQrCard
          menuUrl={menuUrl}
          shopName={dashboardMenu.shop_name}
        />
      </div>
      <MenuPageMenuTemplateGrid templates={menuTemplates} />
    </DashboardContainer>
  );
}
