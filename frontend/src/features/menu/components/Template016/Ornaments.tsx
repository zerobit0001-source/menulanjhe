import { V016 } from "./utils";

/** Botanical line-art sprig used in the branding panel. */
export function BotanicalSprig({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M4 20 C34 20 60 18 116 20" />
      <path d="M26 20 C20 10 28 4 36 7 C34 13 31 17 26 20Z" />
      <path d="M26 20 C20 30 28 36 36 33 C34 27 31 23 26 20Z" />
      <path d="M50 19 C45 9 53 3 61 6 C59 12 55 16 50 19Z" />
      <path d="M50 19 C45 29 53 35 61 32 C59 26 55 22 50 19Z" />
      <path d="M76 19 C72 11 79 6 86 9 C84 14 80 17 76 19Z" />
      <path d="M76 19 C72 27 79 32 86 29 C84 24 80 21 76 19Z" />
      <path d="M100 19.5 C98 15 102 12 106 14 C105 17 103 18.5 100 19.5Z" />
      <circle cx="112" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Small corner bracket with a diamond. Rotate with `className` for other corners. */
export function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M2 28 V8 C2 4.7 4.7 2 8 2 H28" />
      <path d="M8 22 V12 C8 9.8 9.8 8 12 8 H22" opacity="0.6" />
      <path d="M2 2 l3 0 l-3 3 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Two thin horizontal lines with a gap, as on printed menus. */
export function DoubleRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-[5px] border-y ${className}`}
      style={{ borderColor: V016.border }}
    />
  );
}

/** Row of small dots (decorative separator). */
export function DotRow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-1.5 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${V016.border} 1.1px, transparent 1.3px)`,
        backgroundSize: "9px 6px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
      }}
    />
  );
}

/** Thin ornamental frame with four corner brackets. */
export function OrnamentalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative p-3 sm:p-5"
      style={{ border: `1px solid ${V016.border}`, backgroundColor: V016.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-1.5"
        style={{ border: `1px solid ${V016.border}55` }}
      />

      <CornerOrnament className="absolute left-1 top-1 h-6 w-6 text-[#B88C66]" />
      <CornerOrnament className="absolute right-1 top-1 h-6 w-6 rotate-90 text-[#B88C66]" />
      <CornerOrnament className="absolute bottom-1 right-1 h-6 w-6 rotate-180 text-[#B88C66]" />
      <CornerOrnament className="absolute bottom-1 left-1 h-6 w-6 -rotate-90 text-[#B88C66]" />

      <div className="relative">{children}</div>
    </div>
  );
}
