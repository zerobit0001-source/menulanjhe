"use client";

import { useState } from "react";
import { dashboardMenu, menuTemplates } from "../../data/menu/demoMenu";
import { MenuTemplate } from "../../types/menu/menu.type";
import MenuPageMenuTemplateCard from "./MenuPageMenuTemplateCard";

type Props = {
  templates: MenuTemplate[];
};

export default function MenuPageMenuTemplateGrid({ templates }: Props) {
  const [activeTemplate, setActiveTemplate] = useState(
    dashboardMenu.active_template,
  );

  const handleTemplateSelect = (template: (typeof menuTemplates)[number]) => {
    setActiveTemplate(template.id);

    console.log("Selected template:", template.id);
  };

  const handleTemplatePreview = (template: (typeof menuTemplates)[number]) => {
    console.log("Preview template:", template.id);
  };
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900">قالب‌های منو</h2>

        <p className="mt-1 text-xs text-gray-400">
          ظاهر منوی مشتریان خود را انتخاب کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <MenuPageMenuTemplateCard
            key={template.id}
            template={template}
            selected={template.id === activeTemplate}
            onSelect={handleTemplateSelect}
            onPreview={handleTemplatePreview}
          />
        ))}
      </div>
    </div>
  );
}
