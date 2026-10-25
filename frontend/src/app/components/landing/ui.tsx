import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  labelledBy,
  tone = "default",
  className = "",
  children,
}: {
  id: string;
  labelledBy: string;
  tone?: "default" | "muted";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`ml-section py-20 sm:py-24 ${
        tone === "muted" ? "bg-stone-50" : "bg-white"
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-start";
  return (
    <div className={`mb-12 max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold text-teal-700">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className="text-2xl font-bold leading-[1.6] text-stone-900 sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-stone-600">{description}</p>
      ) : null}
    </div>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors motion-reduce:transition-none sm:text-base";

const buttonVariants = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary:
    "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50",
};

export function LinkButton({
  href,
  variant = "primary",
  withArrow = false,
  className = "",
  onClick,
  children,
}: LinkButtonProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${focusRing} ${className}`;
  const content = (
    <>
      {children}
      {withArrow ? <ArrowLeft aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );

  const isExternal = /^https?:\/\//.test(href);
  const isHash = href.startsWith("#");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  if (isHash) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
