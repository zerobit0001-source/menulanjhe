"use client";

import {
  CalendarDays,
  ChevronLeft,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { Avatar, Card, Chip, Divider, Typography } from "@mui/material";
import Link from "next/link";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";



type ProfilePageClientProps = {
  user: CurrentUserResponse;
};

const roleLabels: Record<string, string> = {
  owner: "مالک",
  manager: "مدیر",
  accountant: "حسابدار",
  cashier: "صندوقدار",
  waiter: "گارسون",
  staff: "کارمند",
};

function getRoleLabel(role: string) {
  return roleLabels[role] ?? role;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function ProfilePageClient({ user }: ProfilePageClientProps) {
  const currentUser = user.user;

  const activeMemberships = user.memberships.filter(
    (membership) => membership.is_active,
  );

  return (
    <DashboardContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography
              component="h1"
              className="text-xl! font-bold! text-slate-900 sm:text-2xl!"
            >
              پروفایل
            </Typography>

            <Typography component="p" className="mt-1! text-sm! text-slate-500">
              اطلاعات حساب کاربری و مجموعه‌های شما
            </Typography>
          </div>

          <Link
            href="/dashboard/settings/profile/edit"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            ویرایش پروفایل
            <ChevronLeft size={17} />
          </Link>
        </div>

        {/* Profile overview */}
        <Card
          elevation={0}
          className="overflow-hidden rounded-2xl! border border-slate-200!"
        >
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar
                sx={{
                  width: 76,
                  height: 76,
                  bgcolor: "grey.900",
                  fontSize: 24,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(currentUser.full_name)}
              </Avatar>

              <div className="min-w-0">
                <Typography
                  component="h2"
                  className="text-lg! font-bold! text-slate-900 sm:text-xl!"
                >
                  {currentUser.full_name}
                </Typography>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Chip
                    label={currentUser.is_active ? "حساب فعال" : "حساب غیرفعال"}
                    size="small"
                    color={currentUser.is_active ? "success" : "default"}
                    variant="outlined"
                  />

                  {activeMemberships[0] && (
                    <Chip
                      label={getRoleLabel(activeMemberships[0].role)}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Account information */}
        <Card elevation={0} className="rounded-2xl! border border-slate-200!">
          <div className="p-5 sm:p-6">
            <div className="mb-5">
              <Typography
                component="h2"
                className="text-base! font-bold! text-slate-900"
              >
                اطلاعات حساب
              </Typography>

              <Typography
                component="p"
                className="mt-1! text-sm! text-slate-500"
              >
                اطلاعات اصلی حساب کاربری شما
              </Typography>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ProfileInfoItem
                icon={<User size={18} />}
                label="نام و نام خانوادگی"
                value={currentUser.full_name}
              />

              <ProfileInfoItem
                icon={<Phone size={18} />}
                label="شماره موبایل"
                value={currentUser.phone_number}
              />

              <ProfileInfoItem
                icon={<Mail size={18} />}
                label="ایمیل"
                value={currentUser.email || "ثبت نشده"}
              />

              <ProfileInfoItem
                icon={<CalendarDays size={18} />}
                label="تاریخ عضویت"
                value={formatDate(currentUser.created_at)}
              />
            </div>
          </div>
        </Card>

        {/* Memberships */}
        <Card elevation={0} className="rounded-2xl! border border-slate-200!">
          <div className="p-5 sm:p-6">
            <div className="mb-5">
              <Typography
                component="h2"
                className="text-base! font-bold! text-slate-900"
              >
                مجموعه‌ها
              </Typography>

              <Typography
                component="p"
                className="mt-1! text-sm! text-slate-500"
              >
                مجموعه‌هایی که حساب شما به آن‌ها دسترسی دارد
              </Typography>
            </div>

            <div className="space-y-3">
              {user.memberships.map((membership) => (
                <MembershipItem
                  key={membership.tenant_id}
                  membership={membership}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card elevation={0} className="rounded-2xl! border border-slate-200!">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <ShieldCheck size={20} />
              </div>

              <div className="min-w-0">
                <Typography
                  component="h2"
                  className="text-base! font-bold! text-slate-900"
                >
                  امنیت حساب
                </Typography>

                <Typography
                  component="p"
                  className="mt-1! text-sm! leading-6! text-slate-500"
                >
                  برای تغییر رمز عبور و مدیریت امنیت حساب از بخش مربوطه استفاده
                  کنید.
                </Typography>

                <Link
                  href="/dashboard/settings/change-password"
                  className="mt-3 inline-flex text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  تغییر رمز عبور
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardContainer>
  );
}

function ProfileInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function MembershipItem({ membership }: { membership: CurrentMembership }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {membership.tenant_name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {getRoleLabel(membership.role)}
          </p>
        </div>

        <Chip
          label={membership.is_active ? "فعال" : "غیرفعال"}
          size="small"
          color={membership.is_active ? "success" : "default"}
          variant="outlined"
        />
      </div>
    </div>
  );
}
