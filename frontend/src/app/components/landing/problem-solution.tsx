import { problemSolutionPairs } from "@/config/landing";
import { Section, SectionHeading } from "./ui";

export function ProblemSolution() {
  return (
    <Section id="problem-solution" labelledBy="problem-title">
      <SectionHeading
        id="problem-title"
        eyebrow="چرا منوی دیجیتال؟"
        title="مدیریت منو نباید هر بار دردسر باشه"
        description="منوی چاپی و پراکنده‌سازی اطلاعات محصولات، کار روزمره کسب‌وکار رو سخت می‌کنه. منو لاژو این کارها رو در یک جا جمع می‌کنه."
      />

      <ul className="space-y-5">
        {problemSolutionPairs.map((pair) => {
          const Icon = pair.icon;
          return (
            <li key={pair.id} className="grid gap-4 md:grid-cols-2 md:gap-6">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="mb-2 text-xs font-semibold text-stone-500">
                  چالش
                </p>
                <h3 className="text-lg font-bold text-stone-900">
                  {pair.problemTitle}
                </h3>
                <p className="mt-2 text-sm leading-8 text-stone-600">
                  {pair.problemText}
                </p>
              </div>

              <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Icon aria-hidden="true" className="h-4 w-4 text-teal-700" />
                  <p className="text-xs font-semibold text-teal-800">راه‌حل</p>
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {pair.solutionTitle}
                </h3>
                <p className="mt-2 text-sm leading-8 text-stone-700">
                  {pair.solutionText}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
