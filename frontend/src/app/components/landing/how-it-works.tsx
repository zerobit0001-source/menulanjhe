import { Info } from "lucide-react";
import { steps } from "@/config/landing";
import { Section, SectionHeading } from "./ui";

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" tone="muted">
      <SectionHeading
        id="how-title"
        eyebrow="نحوه کار"
        title="راه‌اندازی منو در چهار مرحله"
      />

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-base font-bold text-white"
            >
              {(index + 1).toLocaleString("fa-IR")}
            </span>
            <h3 className="mt-4 text-base font-bold leading-8 text-stone-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-8 text-stone-600">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-teal-200 bg-teal-50/60 p-5">
        <Info
          aria-hidden="true"
          className="mt-1 h-5 w-5 shrink-0 text-teal-700"
        />
        <p className="text-sm leading-8 text-stone-700">
          در حال حاضر راه‌اندازی حساب کسب‌وکار با همکاری تیم منو لاژو انجام
          می‌شه و ثبت‌نام عمومی وجود نداره.
        </p>
      </div>
    </Section>
  );
}
