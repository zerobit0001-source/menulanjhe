import Image from "next/image";

import { menuTemplates } from "@/config/landing";
import { Section, SectionHeading } from "./ui";

// All screenshots share the same size.
const IMAGE_WIDTH = 220;
const IMAGE_HEIGHT = 478;

export function TemplatesGallery() {
  return (
    <Section id="templates" labelledBy="templates-title">
      <SectionHeading
        id="templates-title"
        eyebrow="قالب‌های منو"
        title="ظاهر منو رو متناسب با کسب‌وکارت انتخاب کن"
        description="هر قالب، محصولات رو به شکل متفاوتی به مشتری نشون می‌ده."
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {menuTemplates.map((template, index) => (
          <li
            key={template.id}
            className="group min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 transition-shadow duration-300 hover:shadow-lg motion-reduce:transition-none sm:p-4"
          >
            {/* Preview: the screenshot keeps its real size inside a phone frame,
                so it is never stretched or upscaled. */}
            <div className="flex justify-center rounded-xl bg-stone-100 px-4 py-8">
              <div className="rounded-[2.25rem] border border-stone-300 bg-stone-900 p-1.5 shadow-xl transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                <div className="overflow-hidden rounded-[1.8rem] bg-white">
                  <Image
                    src={template.src}
                    alt={`پیش‌نمایش ${template.name}`}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    quality={100}
                    priority={index === 0}
                    sizes={`${IMAGE_WIDTH}px`}
                    className="block h-auto w-[220px] max-w-full"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="px-1 pb-1 pt-4 sm:px-2 sm:pt-5">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <h3 className="min-w-0 truncate text-sm font-bold text-stone-900 sm:text-base">
                  {template.name}
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
