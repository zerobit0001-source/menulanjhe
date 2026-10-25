import type { Metadata } from "next";
import "./landing.css";
import { Navbar } from "./components/landing/navbar";
import { Hero } from "./components/landing/hero";
import { ProductDemo } from "./components/landing/product-demo";
import { ProblemSolution } from "./components/landing/problem-solution";
import { Features } from "./components/landing/features";
import { TemplatesGallery } from "./components/landing/templates-gallery";
import { HowItWorks } from "./components/landing/how-it-works";
import { DashboardPreview } from "./components/landing/dashboard-preview";
import { TargetBusinesses } from "./components/landing/target-businesses";
import { GettingStarted } from "./components/landing/getting-started";
import { Faq } from "./components/landing/faq";
import { FinalCta } from "./components/landing/final-cta";
import { Footer } from "./components/landing/footer";

const title = "منو لاژو | منوی دیجیتال و QR Code برای کافه و رستوران";
const description =
  "با منو لاژو منوی دیجیتال کسب‌وکارت رو مدیریت کن، محصولات و قیمت‌ها رو به‌روزرسانی کن و با لینک یا QR Code در اختیار مشتری‌هات قرار بده.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fa_IR",
    siteName: "منو لاژو",
  },
};

export default function LandingPage() {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="ml-landing bg-white text-stone-900 antialiased"
    >
      <a
        href="#main"
        className="sr-only rounded-lg bg-teal-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900"
      >
        پرش به محتوای اصلی
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <ProductDemo />
        <ProblemSolution />
        <Features />
        <TemplatesGallery />
        <HowItWorks />
        <DashboardPreview />
        <TargetBusinesses />
        <GettingStarted />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
