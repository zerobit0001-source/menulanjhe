import { LayoutTemplate } from "lucide-react";
import { menuTemplates } from "@/config/landing";
import { ImagePlaceholder } from "./image-placeholder";
import { Section, SectionHeading } from "./ui";
import Image from "next/image";

export function TemplatesGallery() {
  return (
    <Section id="templates" labelledBy="templates-title">
      <SectionHeading
        id="templates-title"
        eyebrow="قالب‌های منو"
        title="ظاهر منو رو متناسب با کسب‌وکارت انتخاب کن"
        description="هر قالب، محصولات رو به شکل متفاوتی به مشتری نشون می‌ده."
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuTemplates.map((template) => (
          <li
            key={template.id}
            className="min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 sm:p-4"
          >
            {/* Preview */}
            <div className="relative aspect-[3/5] w-full overflow-hidden rounded-xl bg-stone-100">
              <Image
                src={template.src}
                alt={template.name}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              />
            </div>

            {/* Details */}
            <div className="px-1 pb-1 pt-4 sm:px-2 sm:pt-5">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <h3 className="min-w-0 truncate text-sm font-bold text-stone-900 sm:text-base">
                  {template.name}
                  menulounge
                </h3>

                <span
                  dir="ltr"
                  className="shrink-0 rounded-md bg-stone-100 px-2 py-1 text-[10px] text-stone-500 sm:text-xs"
                >
                  {template.id}
                </span>
              </div>

              <p className="mt-2 text-xs leading-6 text-stone-600 sm:text-sm sm:leading-8">
                {template.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
