import type { Metadata } from "next";

import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";

import "./globals.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "منو لانژ",
    template: "%s | منو لانژ",
  },

  description:
    "منو لانژ، پلتفرم منوی دیجیتال و مدیریت سفارش کافه و رستوران با لینک اختصاصی و QR Code.",

  applicationName: "منو لانژ",

  creator: "منو لانژ",
  publisher: "منو لانژ",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "منو لانژ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <NextTopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
