import MenuThemeProvider from "@/features/menu/MenuThemeProvider";

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MenuThemeProvider>{children}</MenuThemeProvider>;
}
