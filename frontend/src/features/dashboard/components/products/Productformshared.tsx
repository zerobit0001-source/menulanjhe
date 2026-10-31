import type { ReactNode } from "react";

const DEFAULT_API_ERROR = "ثبت محصول انجام نشد. لطفاً دوباره تلاش کنید.";

/** Extracts the backend `message` from an RTK Query error, if present. */
export function getApiErrorMessage(
  error: unknown,
  fallback: string = DEFAULT_API_ERROR,
): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: unknown }).data;

    if (typeof data === "object" && data !== null && "message" in data) {
      const message = (data as { message?: unknown }).message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }
  }

  return fallback;
}

export function FormSection({
  title,
  description,
  className = "",
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-5">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
