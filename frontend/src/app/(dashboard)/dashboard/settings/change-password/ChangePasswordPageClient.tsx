"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Alert, Button, Card, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "@/features/auth/api/authApi";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggleVisibility: () => void;
  placeholder: string;
  error?: string;
};

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  placeholder,
  error,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div
        className={`flex h-12 items-center rounded-xl border bg-white transition ${
          error
            ? "border-red-300 focus-within:border-red-500"
            : "border-slate-200 focus-within:border-slate-400"
        }`}
      >
        <LockKeyhole size={18} className="mr-4 shrink-0 text-slate-400" />

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function ChangePasswordPageClient() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!oldPassword.trim()) {
      nextErrors.oldPassword = "رمز عبور فعلی را وارد کنید.";
    }

    if (!newPassword.trim()) {
      nextErrors.newPassword = "رمز عبور جدید را وارد کنید.";
    } else if (newPassword.length < 8) {
      nextErrors.newPassword = "رمز عبور جدید باید حداقل ۸ کاراکتر باشد.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "تکرار رمز عبور جدید را وارد کنید.";
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = "رمزهای عبور با یکدیگر مطابقت ندارند.";
    }

    if (oldPassword && newPassword && oldPassword === newPassword) {
      nextErrors.newPassword =
        "رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  function getChangePasswordErrorMessage(message?: string) {
    if (!message) {
      return "تغییر رمز عبور انجام نشد.";
    }

    if (message.includes("password_too_common")) {
      return "رمز عبور جدید خیلی ساده و قابل حدس است.";
    }

    if (message.includes("password_entirely_numeric")) {
      return "رمز عبور جدید نباید فقط شامل اعداد باشد.";
    }

    if (message.includes("password_too_short")) {
      return "رمز عبور جدید خیلی کوتاه است.";
    }

    if (message.includes("password_mismatch")) {
      return "رمزهای عبور با یکدیگر مطابقت ندارند.";
    }

    return "تغییر رمز عبور انجام نشد.";
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      if (response?.ok === false) {
        throw new Error(response.message || "تغییر رمز عبور انجام نشد.");
      }

      toast.success(response.message || "رمز عبور با موفقیت تغییر کرد.");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error: any) {
      const backendMessage =
        error?.data?.message || error?.data?.detail || error?.message;

      const message = getChangePasswordErrorMessage(backendMessage);

      toast.error(message);
    }
  };

  return (
    <DashboardContainer>
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/settings/profile"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800"
          >
            <ArrowRight size={17} />
            بازگشت به پروفایل
          </Link>

          <Typography
            component="h1"
            className="text-xl! font-bold! text-slate-900 sm:text-2xl!"
          >
            تغییر رمز عبور
          </Typography>

          <Typography component="p" className="mt-1! text-sm! text-slate-500">
            برای حفظ امنیت حساب خود، رمز عبور جدیدی انتخاب کنید.
          </Typography>
        </div>

        <Card
          elevation={0}
          className="overflow-hidden rounded-2xl! border border-slate-200!"
        >
          <div className="p-5 sm:p-7">
            {/* Security info */}
            <div className="mb-7 flex gap-4 rounded-xl bg-slate-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  امنیت حساب
                </p>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  از یک رمز عبور قوی استفاده کنید و آن را در اختیار دیگران قرار
                  ندهید.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <PasswordField
                label="رمز عبور فعلی"
                value={oldPassword}
                onChange={setOldPassword}
                showPassword={showOldPassword}
                onToggleVisibility={() => setShowOldPassword((value) => !value)}
                placeholder="رمز عبور فعلی را وارد کنید"
                error={errors.oldPassword}
              />

              <PasswordField
                label="رمز عبور جدید"
                value={newPassword}
                onChange={setNewPassword}
                showPassword={showNewPassword}
                onToggleVisibility={() => setShowNewPassword((value) => !value)}
                placeholder="رمز عبور جدید را وارد کنید"
                error={errors.newPassword}
              />

              <PasswordField
                label="تکرار رمز عبور جدید"
                value={confirmPassword}
                onChange={setConfirmPassword}
                showPassword={showConfirmPassword}
                onToggleVisibility={() =>
                  setShowConfirmPassword((value) => !value)
                }
                placeholder="رمز عبور جدید را دوباره وارد کنید"
                error={errors.confirmPassword}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    height: 48,
                    borderRadius: 3,
                    backgroundColor: "#0F172A",
                    boxShadow: "none",
                    fontFamily: "Vazirmatn, sans-serif",
                    "&:hover": {
                      backgroundColor: "#1E293B",
                      boxShadow: "none",
                    },
                    "&:disabled": {
                      backgroundColor: "#CBD5E1",
                    },
                  }}
                >
                  {isLoading ? "در حال تغییر رمز عبور..." : "تغییر رمز عبور"}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </DashboardContainer>
  );
}
