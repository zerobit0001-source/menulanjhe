import { ImageOff } from "lucide-react";

export const T7 = {
  bg: "#FAFAFA",
  surface: "#FFFFFF",
  primary: "#F5C400",
  primaryHover: "#E5B800",
  text: "#171717",
  secondary: "#737373",
  muted: "#A3A3A3",
  border: "#E5E5E5",
} as const;

const nf = new Intl.NumberFormat("fa-IR");
export const formatToman = (n: number) => `${nf.format(n)} تومان`;
export const faNum = (n: number) => nf.format(n);

export function Template007Thumb({ src, alt, className = "" }: { src?: string | null; alt: string; className?: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <div className={`flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-300 ${className}`} aria-hidden>
      <ImageOff size={28} strokeWidth={1.5} />
    </div>
  );
}
