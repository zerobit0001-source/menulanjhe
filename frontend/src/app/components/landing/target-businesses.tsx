import { businesses } from "@/config/landing";
import { Section, SectionHeading } from "./ui";

export function TargetBusinesses() {
  return (
    <Section id="businesses" labelledBy="businesses-title" tone="muted">
      <SectionHeading
        id="businesses-title"
        eyebrow="مناسب برای"
        title="منو لاژو برای چه کسب‌وکارهایی ساخته شده؟"
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {businesses.map((business) => {
          const Icon = business.icon;
          return (
            <li
              key={business.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-center"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700"
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-stone-900">
                {business.title}
              </h3>
              <p className="mt-2 text-sm leading-8 text-stone-600">
                {business.description}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
