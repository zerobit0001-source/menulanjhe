import { Smartphone } from "lucide-react";
import { demoHref, requestHref } from "@/config/landing";
import { ImagePlaceholder } from "./image-placeholder";
import { Container, LinkButton } from "./ui";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="ml-section bg-white pb-20 pt-32 sm:pt-36 lg:pb-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="ml-fade-up inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-800">
              منوی دیجیتال برای کسب‌وکارهای حرفه‌ای
            </p>

            <h1
              id="hero-title"
              className="ml-fade-up ml-delay-1 mt-6 text-3xl font-bold leading-[1.7] text-stone-900 sm:text-4xl lg:text-[2.75rem]"
            >
              منوی کسب‌وکارت رو هوشمندتر، ساده‌تر و همیشه به‌روز نگه دار
            </h1>

            <p className="ml-fade-up ml-delay-2 mt-6 max-w-xl text-base leading-9 text-stone-600 sm:text-lg">
              با منو لاژو، منوی دیجیتال کسب‌وکارت رو مدیریت کن، محصولات و
              قیمت‌ها رو به‌روزرسانی کن و با یک لینک یا QR Code در اختیار
              مشتری‌هات قرار بده.
            </p>

            <div className="ml-fade-up ml-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={requestHref} withArrow>
                درخواست راه‌اندازی منو
              </LinkButton>
              <LinkButton href={demoHref} variant="secondary">
                مشاهده منوی نمونه
              </LinkButton>
            </div>

            <p className="mt-5 text-sm leading-7 text-stone-500">
              ثبت‌نام عمومی وجود نداره؛ حساب کسب‌وکار توسط تیم منو لاژو ساخته
              می‌شه.
            </p>
          </div>

          <div className="ml-fade-up ml-delay-2">
            <ImagePlaceholder
              label="جایگاه تصویر اصلی محصول"
              description="اسکرین‌شات منوی مشتری روی موبایل در این بخش قرار می‌گیره."
              icon={Smartphone}
              aspect="4 / 5"
              className="mx-auto max-w-md lg:max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
