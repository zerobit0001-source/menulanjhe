"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, UtensilsCrossed, X } from "lucide-react";
import Link from "next/link";
import { navLinks, requestHref, siteConfig } from "@/config/landing";
import { Container, LinkButton, focusRing } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Border/shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the mobile menu when the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur transition-shadow motion-reduce:transition-none ${
        scrolled || open ? "border-b border-stone-200 shadow-sm" : ""
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo — replace the icon box with your real logo when available */}
        <a
          href="#home"
          className={`flex items-center gap-2 rounded-lg ${focusRing}`}
          onClick={close}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white"
          >
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-stone-900">
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="ناوبری اصلی" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 motion-reduce:transition-none ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {siteConfig.loginUrl ? (
            <Link
              href={siteConfig.loginUrl}
              className={`hidden rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 lg:inline-block ${focusRing}`}
            >
              ورود به پنل
            </Link>
          ) : null}

          <LinkButton
            href={requestHref}
            className="hidden !py-2 text-sm sm:inline-flex"
          >
            درخواست راه‌اندازی
          </LinkButton>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            onClick={() => setOpen((value) => !value)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 lg:hidden ${focusRing}`}
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-stone-200 bg-white lg:hidden"
        >
          <Container className="py-4">
            <nav aria-label="ناوبری موبایل">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className={`block rounded-lg px-3 py-3 text-base font-medium text-stone-700 hover:bg-stone-50 ${focusRing}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {siteConfig.loginUrl ? (
                  <li>
                    <Link
                      href={siteConfig.loginUrl}
                      onClick={close}
                      className={`block rounded-lg px-3 py-3 text-base font-medium text-stone-700 hover:bg-stone-50 ${focusRing}`}
                    >
                      ورود به پنل
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
            <LinkButton
              href={requestHref}
              onClick={close}
              className="mt-4 w-full"
            >
              درخواست راه‌اندازی
            </LinkButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
