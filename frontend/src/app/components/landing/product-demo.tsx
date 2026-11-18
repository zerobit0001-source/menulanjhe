"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Pause, Play } from "lucide-react";

import { siteConfig } from "@/config/landing";
import { Section, SectionHeading } from "./ui";

const points = [
  "منو در مرورگر موبایل مشتری باز می‌شه و نیازی به نصب اپلیکیشن نیست.",
  "محصولات در دسته‌بندی‌های مرتب، همراه با تصویر و قیمت نمایش داده می‌شن.",
  "با اسکن QR Code یا باز کردن لینک، منو در دسترس مشتری قرار می‌گیره.",
];

const slides = [
  {
    src: "/images/mainpage/image (1).png",
    alt: "نمای منوی دیجیتال",
  },
  {
    src: "/images/mainpage/image (2).png",
    alt: "نمای دسته‌بندی محصولات",
  },
  {
    src: "/images/mainpage/image (3).png",
    alt: "نمای محصولات منو",
  },
  {
    src: "/images/mainpage/image (4).png",
    alt: "نمای جزئیات محصول",
  },
];

// All screenshots share the same size.
const IMAGE_WIDTH = 220;
const IMAGE_HEIGHT = 478;

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 40;

/**
 * Circular distance between slide `index` and the active slide.
 * Positive = comes after the active slide, negative = before it.
 */
function getOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function ProductDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const pointerStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const total = slides.length;

  const goTo = (index: number) => setActiveIndex((index + total) % total);
  const next = () => setActiveIndex((current) => (current + 1) % total);
  const prev = () => setActiveIndex((current) => (current - 1 + total) % total);

  // Respect prefers-reduced-motion: no autoplay, no movement.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(query.matches);
      if (query.matches) setIsPlaying(false);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Autoplay (pauses on hover/focus or when the user pauses it).
  useEffect(() => {
    if (!isPlaying || isHovered || reducedMotion) return;
    const timer = setInterval(
      () => setActiveIndex((current) => (current + 1) % total),
      AUTOPLAY_MS,
    );
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, reducedMotion, total]);

  // The page is RTL: "next" is on the left, "previous" on the right.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      prev();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
    didSwipe.current = false;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    didSwipe.current = true;
    // Stage is laid out so later slides sit on the left (RTL reading order).
    if (deltaX < 0) next();
    else prev();
  };

  return (
    <Section id="demo" labelledBy="demo-title" tone="muted">
      <SectionHeading
        id="demo-title"
        title="منوی دیجیتال رو از نزدیک ببین"
        description="تجربه‌ای که مشتری‌هات هنگام باز کردن منوی کسب‌وکارت دارن."
      />

      <div className="grid items-center gap-10 lg:grid-cols-5">
        {/* Features */}
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800"
                >
                  <Check className="h-4 w-4" />
                </span>

                <span className="text-base leading-8 text-stone-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {siteConfig.demoUrl ? (
            <a
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center gap-2 rounded-lg text-base font-semibold text-teal-800 hover:text-teal-900 ${""}`}
            >
              مشاهده منوی نمونه
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        {/* Phone carousel */}
        <div className="lg:col-span-3">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="تصاویر منوی دیجیتال"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            className={`relative mx-auto w-full max-w-[640px] ${""}`}
          >
            {/* Stage. dir=ltr keeps the transform math predictable. */}
            <div
              dir="ltr"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (pointerStartX.current = null)}
              className="relative h-[540px] select-none overflow-hidden [--step:112px] sm:[--step:190px]"
              style={{ touchAction: "pan-y" }}
            >
              {/* Soft backdrop behind the active phone */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/70 sm:h-[440px] sm:w-[440px]"
              />

              {slides.map((slide, index) => {
                const offset = getOffset(index, activeIndex, total);
                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 1;

                const scale = isActive ? 1 : 0.84;
                // Later slides sit on the left, matching RTL reading order.
                const translate = `calc(-50% + var(--step) * ${-offset})`;

                return (
                  <button
                    key={slide.src}
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`${slide.alt} (${index + 1} از ${total})`}
                    aria-current={isActive}
                    aria-hidden={!isVisible}
                    onClick={() => {
                      if (didSwipe.current) {
                        didSwipe.current = false;
                        return;
                      }
                      goTo(index);
                    }}
                    className={`absolute left-1/2 top-1/2 -mt-[245px] rounded-[2.25rem] border border-stone-300 bg-stone-900 p-1.5 shadow-xl transition-[transform,opacity,box-shadow] duration-500 ease-out motion-reduce:transition-none ${
                      isActive
                        ? "z-20 cursor-default shadow-2xl"
                        : "z-10 cursor-pointer opacity-60 hover:opacity-90"
                    } ${isVisible ? "" : "pointer-events-none opacity-0"}`}
                    style={{
                      transform: `translateX(${translate}) scale(${scale})`,
                    }}
                  >
                    <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        priority={index === 0}
                        draggable={false}
                        className="block h-auto w-[220px]"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-2 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="تصویر قبلی"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition hover:bg-stone-50 ${""}`}
              >
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`رفتن به تصویر ${index + 1}`}
                    aria-current={index === activeIndex}
                    className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                      index === activeIndex
                        ? "w-7 bg-teal-700"
                        : "w-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="تصویر بعدی"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition hover:bg-stone-50 ${""}`}
              >
                <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 text-sm text-stone-500">
              <button
                type="button"
                onClick={() => setIsPlaying((value) => !value)}
                aria-label={isPlaying ? "توقف نمایش خودکار" : "پخش خودکار"}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-stone-600 hover:bg-stone-200 ${""}`}
              >
                {isPlaying ? (
                  <Pause aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Play aria-hidden="true" className="h-4 w-4" />
                )}
              </button>

              <p aria-live={isPlaying ? "off" : "polite"}>
                {slides[activeIndex].alt} · {activeIndex + 1} از {total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
