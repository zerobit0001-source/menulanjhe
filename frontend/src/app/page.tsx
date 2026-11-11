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

const title = "منوی دیجیتال و QR Code برای کافه و رستوران";

const description =
  "با منو لانژ منوی دیجیتال کافه یا رستورانت رو بساز و مدیریت کن. محصولات و قیمت‌ها رو به‌روزرسانی کن و منوی خودت رو با لینک اختصاصی یا QR Code در اختیار مشتری‌ها قرار بده.";

export const metadata: Metadata = {
  title,

  description,

  alternates: {
    canonical: "/",
  },
  keywords: [
    "منوی دیجیتال",
    "منوی آنلاین رستوران",
    "منوی QR Code",
    "طراحی منوی کافه",
  ],

  openGraph: {
    title: "منو لانژ | منوی دیجیتال کافه و رستوران",
    description,
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "منو لانژ",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "منو لانژ، سامانه منوی دیجیتال و مدیریت سفارش رستوران",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "منو لانژ | منوی دیجیتال کافه و رستوران",
    description,
    images: ["/images/banner.jpg"],
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
