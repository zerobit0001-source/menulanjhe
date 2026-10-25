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
            className={index === 0 ? "md:col-span-2" : undefined}
          >
            <ImagePlaceholder
              label={shot.label}
              description={shot.description}
              icon={shot.icon}
              aspect={index === 0 ? "21 / 9" : "16 / 10"}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
