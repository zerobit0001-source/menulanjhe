import { requestHref } from "@/config/landing";
import { Container, LinkButton } from "./ui";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-stone-900 py-20 sm:py-24"
    >
      <Container className="text-center">
        <h2
          id="final-cta-title"
          className="mx-auto max-w-2xl text-2xl font-bold leading-[1.7] text-white sm:text-3xl"
        >
          منوی دیجیتال کسب‌وکارت رو با منو لاژو شروع کن
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href={requestHref} withArrow>
            درخواست راه‌اندازی منو
          </LinkButton>
          <LinkButton
            href="#features"
            variant="secondary"
            className="border-stone-600 bg-transparent text-white hover:bg-stone-800"
          >
            مشاهده امکانات
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
