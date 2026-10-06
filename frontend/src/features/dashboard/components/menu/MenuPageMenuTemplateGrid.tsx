"use client";

import { Menu } from "../../types/menu/menu.type";
import MenuPageMenuTemplateCard from "./MenuPageMenuTemplateCard";

type Props = {
  templates: Menu[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  isUpdating?: boolean;
};

export default function MenuPageMenuTemplateGrid({
  templates,
  selectedTemplate,
  onSelect,
  isUpdating = false,
}: Props) {
  const handleTemplatePreview = (template: Menu) => {
    console.log("Preview template:", template.id);
  };

  return (
    <div className="mt-6">
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
            selected={template.id === selectedTemplate}
            onSelect={onSelect}
            onPreview={handleTemplatePreview}
            disabled={isUpdating}
          />
        ))}
      </div>
    </div>
  );
}
