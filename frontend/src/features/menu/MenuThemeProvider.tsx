"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const menuTheme = createTheme({
  direction: "rtl",

  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});

export default function MenuThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={menuTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
