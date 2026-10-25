import { features } from "@/config/landing";
import { Section, SectionHeading } from "./ui";

export function Features() {
  const items = features.filter((feature) => feature.enabled);

  return (
    <Section id="features" labelledBy="features-title" tone="muted">
      <SectionHeading
        id="features-title"
        eyebrow="امکانات"
        title="هر چیزی که برای مدیریت منو لازم داری"
        description="از ساخت منو تا انتشار آن با لینک و QR Code، در یک پلتفرم."
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((feature) => {
          const Icon = feature.icon;
          return (
            <li
              key={feature.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 transition-colors hover:border-teal-300 motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-stone-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-8 text-stone-600">
                {feature.description}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
