import { ArrowLeft, Check, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/landing";
import { ImagePlaceholder } from "./image-placeholder";
import { Section, SectionHeading, focusRing } from "./ui";

const points = [
  "منو در مرورگر موبایل مشتری باز می‌شه و نیازی به نصب اپلیکیشن نیست.",
  "محصولات در دسته‌بندی‌های مرتب، همراه با تصویر و قیمت نمایش داده می‌شن.",
  "با اسکن QR Code یا باز کردن لینک، منو در دسترس مشتری قرار می‌گیره.",
];

export function ProductDemo() {
  return (
    <Section id="demo" labelledBy="demo-title" tone="muted">
      <SectionHeading
        id="demo-title"
        title="منوی دیجیتال رو از نزدیک ببین"
        description="تجربه‌ای که مشتری‌هات هنگام باز کردن منوی کسب‌وکارت دارن."
      />

      <div className="grid items-center gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800"
                >
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-base leading-8 text-stone-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {siteConfig.demoUrl ? (
            <a
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center gap-2 rounded-lg text-base font-semibold text-teal-800 hover:text-teal-900 ${focusRing}`}
            >
              مشاهده منوی نمونه
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="lg:col-span-3">
          <ImagePlaceholder
            label="جایگاه اسکرین‌شات منوی مشتری"
            description="تصویر واقعی منوی دیجیتال از دید مشتری در این بخش قرار می‌گیره."
            icon={Smartphone}
            aspect="16 / 10"
          />
        </div>
      </div>
    </Section>
  );
}
