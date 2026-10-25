import { Image as ImageIcon, type LucideIcon } from "lucide-react";

type ImagePlaceholderProps = {
  /** Persian label describing which real image belongs here. */
  label: string;
  /** Optional extra explanation. */
  description?: string;
  /** Lucide icon shown in the centre. */
  icon?: LucideIcon;
  /** CSS aspect-ratio value, e.g. "16 / 10", "4 / 5", "3 / 4". */
  aspect?: string;
  className?: string;
};

/**
 * Visible stand-in for a real product image.
 * Replace usages with <Image src="/images/..." /> once real assets exist.
 */
export function ImagePlaceholder({
  label,
  description,
  icon: Icon = ImageIcon,
  aspect = "16 / 10",
  className = "",
}: ImagePlaceholderProps) {
  const ariaLabel = description ? `${label}؛ ${description}` : label;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{ aspectRatio: aspect }}
      className={`flex min-h-36 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-stone-300 bg-stone-100 p-4 text-center sm:p-6 ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-400 shadow-sm ring-1 ring-stone-200 sm:h-14 sm:w-14">
        <Icon aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>
      <span className="text-sm font-semibold text-stone-700 sm:text-base">
        {label}
      </span>
      {description ? (
        <span className="max-w-xs text-xs leading-6 text-stone-500 sm:text-sm">
          {description}
        </span>
      ) : null}
    </div>
  );
}

