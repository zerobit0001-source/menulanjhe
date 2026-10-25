import { requestHref } from "@/config/landing";
import { Section, LinkButton } from "./ui";

export function GettingStarted() {
  return (
    <Section id="contact" labelledBy="getting-started-title">
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-stone-50 px-6 py-12 text-center sm:px-12">
        <h2
          id="getting-started-title"
          className="text-2xl font-bold leading-[1.7] text-stone-900 sm:text-3xl"
        >
          برای راه‌اندازی منوی دیجیتال آماده‌ای؟
        </h2>
        <p className="mt-4 text-base leading-9 text-stone-600">
          برای آشنایی با شرایط راه‌اندازی منوی دیجیتال و امکانات مناسب
          کسب‌وکارت، با تیم منو لاژو در ارتباط باش.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href={requestHref} withArrow>
            درخواست راه‌اندازی منو
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
