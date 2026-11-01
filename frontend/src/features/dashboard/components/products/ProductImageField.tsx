"use client";

import { Button, FormHelperText, Typography } from "@mui/material";
import { ImagePlus, Replace, Trash2, UploadCloud } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Validation limits — adjust here                                           */
/* -------------------------------------------------------------------------- */

export const PRODUCT_IMAGE_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const PRODUCT_IMAGE_MAX_SIZE_MB = 5;
export const PRODUCT_IMAGE_MAX_SIZE_BYTES =
  PRODUCT_IMAGE_MAX_SIZE_MB * 1024 * 1024;

const ACCEPT_ATTRIBUTE = PRODUCT_IMAGE_ACCEPTED_TYPES.join(",");

const MESSAGES = {
  invalidType: "فرمت تصویر پشتیبانی نمی‌شود. فقط JPG، PNG و WebP مجاز است.",
  tooLarge: `حجم تصویر نباید بیشتر از ${PRODUCT_IMAGE_MAX_SIZE_MB.toLocaleString(
    "fa-IR",
  )} مگابایت باشد.`,
  loadFailed: "نمایش تصویر ممکن نیست.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ProductImageFieldProps = {
  /** Newly selected local file (pending upload). */
  value: File | null;
  /** Called with the accepted file, or null when the local selection is cleared. */
  onChange: (file: File | null) => void;

  /** URL of an image that already exists on the backend (edit form). */
  existingImageUrl?: string | null;
  /**
   * Called when the user asks to remove the existing backend image.
   * The component never deletes anything itself. If omitted, no remove action
   * is shown for the existing image.
   */
  onRemoveExisting?: () => void;

  /** External error (e.g. from the form / API). Shown in addition to validation errors. */
  error?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
};

type ValidationResult =
  | { ok: true; file: File }
  | { ok: false; message: string };

function validateImageFile(file: File): ValidationResult {
  const isAccepted = (
    PRODUCT_IMAGE_ACCEPTED_TYPES as readonly string[]
  ).includes(file.type);

  if (!isAccepted) {
    return { ok: false, message: MESSAGES.invalidType };
  }

  if (file.size > PRODUCT_IMAGE_MAX_SIZE_BYTES) {
    return { ok: false, message: MESSAGES.tooLarge };
  }

  return { ok: true, file };
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024)).toLocaleString("fa-IR")} کیلوبایت`;
  }

  return `${(bytes / (1024 * 1024)).toLocaleString("fa-IR", {
    maximumFractionDigits: 1,
  })} مگابایت`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ProductImageField({
  value,
  onChange,
  existingImageUrl = null,
  onRemoveExisting,
  error,
  disabled = false,
  label = "تصویر محصول",
  hint = `JPG، PNG یا WebP — حداکثر ${PRODUCT_IMAGE_MAX_SIZE_MB.toLocaleString("fa-IR")} مگابایت`,
}: ProductImageFieldProps) {
  const inputId = useId();
  const descriptionId = useId();
  const errorId = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  /* Object URL lifecycle: created per file, revoked on change / unmount. */
  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      setDimensions(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    setDimensions(null);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [value]);

  const displaySrc = previewUrl ?? existingImageUrl;
  const isShowingExisting = !previewUrl && Boolean(existingImageUrl);
  const hasImage = Boolean(displaySrc);
  const imageFailed = displaySrc !== null && failedSrc === displaySrc;

  const message = error ?? validationError;
  const describedBy = [descriptionId, message ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const acceptFile = (file: File | undefined) => {
    if (!file) return;

    const result = validateImageFile(file);

    if (!result.ok) {
      setValidationError(result.message);
      return;
    }

    setValidationError(null);
    onChange(result.file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    acceptFile(event.target.files?.[0]);

    // Allow selecting the same file again.
    event.target.value = "";
  };

  const handleRemoveLocal = () => {
    setValidationError(null);
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  /* Drag & drop */

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const handleZoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  };

  const dropHandlers = {
    onDragEnter: handleDragOver,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  };

  return (
    <div>
      <Typography
        component="label"
        htmlFor={inputId}
        className="mb-2! block! text-sm! font-semibold! text-gray-700!"
      >
        {label}
      </Typography>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        disabled={disabled}
        onChange={handleInputChange}
        className="sr-only"
        tabIndex={-1}
        aria-describedby={describedBy}
      />

      {!hasImage ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label={`${label}: انتخاب یا رها کردن تصویر`}
          aria-describedby={describedBy}
          onClick={openPicker}
          onKeyDown={handleZoneKeyDown}
          {...dropHandlers}
          className={`flex min-h-52 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
            disabled
              ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
              : isDragging
                ? "cursor-copy border-blue-500 bg-blue-50"
                : message
                  ? "cursor-pointer border-red-300 bg-red-50/40 hover:bg-red-50"
                  : "cursor-pointer border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100/70"
          }`}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              isDragging
                ? "bg-blue-100 text-blue-600"
                : "bg-white text-gray-500 shadow-sm ring-1 ring-gray-200"
            }`}
          >
            {isDragging ? <UploadCloud size={22} /> : <ImagePlus size={22} />}
          </span>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {isDragging
                ? "تصویر را اینجا رها کنید"
                : "تصویر را بکشید و رها کنید"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              یا برای انتخاب فایل کلیک کنید
            </p>
          </div>

          <p id={descriptionId} className="text-[11px] text-gray-400">
            {hint}
          </p>
        </div>
      ) : (
        <div
          {...dropHandlers}
          className={`overflow-hidden rounded-2xl border transition-colors ${
            isDragging
              ? "border-blue-500 ring-2 ring-blue-200"
              : message
                ? "border-red-300"
                : "border-gray-200"
          } bg-white`}
        >
          <div className="relative aspect-4/3 w-full bg-gray-100">
            {imageFailed ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400">
                <ImagePlus size={28} />
                <span className="text-xs">{MESSAGES.loadFailed}</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={displaySrc}
                src={displaySrc ?? undefined}
                alt={value ? `پیش‌نمایش ${value.name}` : "تصویر فعلی محصول"}
                onLoad={(event) => {
                  if (!value) return;
                  setDimensions({
                    width: event.currentTarget.naturalWidth,
                    height: event.currentTarget.naturalHeight,
                  });
                }}
                onError={() => setFailedSrc(displaySrc)}
                className="h-full w-full object-cover"
              />
            )}

            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 text-sm font-semibold text-blue-700 backdrop-blur-[1px]">
                برای جایگزینی رها کنید
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 p-3 ">
            <div id={descriptionId} className="min-w-0">
              {value ? (
                <>
                  <p
                    dir="ltr"
                    className="truncate text-start text-sm font-medium text-gray-800"
                    title={value.name}
                  >
                    {value.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {formatFileSize(value.size)}
                    {dimensions
                      ? ` · ${dimensions.width.toLocaleString("fa-IR")}×${dimensions.height.toLocaleString("fa-IR")} پیکسل`
                      : ""}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-800">
                    تصویر فعلی محصول
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">{hint}</p>
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                size="small"
                variant="outlined"
                onClick={openPicker}
                disabled={disabled}
                startIcon={<Replace size={15} />}
                className="rounded-xl!"
              >
                جایگزینی
              </Button>

              {value ? (
                <Button
                  type="button"
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveLocal}
                  disabled={disabled}
                  startIcon={<Trash2 size={15} />}
                  className="rounded-xl!"
                >
                  حذف انتخاب
                </Button>
              ) : isShowingExisting && onRemoveExisting ? (
                <Button
                  type="button"
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={onRemoveExisting}
                  disabled={disabled}
                  startIcon={<Trash2 size={15} />}
                  className="rounded-xl!"
                >
                  حذف تصویر
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {message && (
        <FormHelperText id={errorId} error role="alert" className="mt-2! mx-0!">
          {message}
        </FormHelperText>
      )}
    </div>
  );
}
