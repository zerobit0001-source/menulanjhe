import { LayoutTemplate } from "lucide-react";
import { menuTemplates } from "@/config/landing";
import { ImagePlaceholder } from "./image-placeholder";
import { Section, SectionHeading } from "./ui";

export function TemplatesGallery() {
  return (
    <Section id="templates" labelledBy="templates-title">
      <SectionHeading
        id="templates-title"
        eyebrow="قالب‌های منو"
        title="ظاهر منو رو متناسب با کسب‌وکارت انتخاب کن"
        description="هر قالب، محصولات رو به شکل متفاوتی به مشتری نشون می‌ده."
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuTemplates.map((template) => (
          <li
            key={template.id}
            className="rounded-2xl border border-stone-200 bg-white p-4"
          >
            <ImagePlaceholder
              label="جایگاه پیش‌نمایش قالب منو"
              description={template.name}
              icon={LayoutTemplate}
              aspect="3 / 4"
            />
            <div className="px-2 pb-2 pt-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-stone-900">
                  {template.name}
                </h3>
                <span
                  dir="ltr"
                  className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-500"
                >
                  {template.id}
                </span>
              </div>
              <p className="mt-2 text-sm leading-8 text-stone-600">
                {template.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
