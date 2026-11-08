import { dashboardShots } from "@/config/landing";
import { ImagePlaceholder } from "./image-placeholder";
import { Section, SectionHeading } from "./ui";

export function DashboardPreview() {
  const shots = dashboardShots.filter((shot) => shot.enabled);

  return (
    <Section id="dashboard" labelledBy="dashboard-title">
      <SectionHeading
        id="dashboard-title"
        eyebrow="پنل مدیریت"
        title="کنترل کامل منو از یک پنل"
        description="نگاهی به بخش‌های اصلی پنل مدیریت."
      />

      <ul className="grid gap-6 md:grid-cols-2">
        {shots.map((shot, index) => (
          <li
            key={shot.id}
            className={`${index === 0 ? "md:col-span-2" : undefined} rounded-xl overflow-hidden p-2 bg-stone-100 `}
          >
            <img
              src={shot.src}
              alt={shot.description}
              className="w-full h-full rounded-xl "
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
