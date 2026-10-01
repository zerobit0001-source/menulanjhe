"use client";

import Link from "next/link";
import { ChevronLeft, LockKeyhole, Settings2, UserRound } from "lucide-react";

import { Card, Typography } from "@mui/material";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";


const settingsItems = [
  {
    title: "پروفایل",
    description: "مشاهده اطلاعات حساب و مجموعه‌های شما",
    href: "/dashboard/settings/profile",
    icon: UserRound,
  },
  {
    title: "تغییر رمز عبور",
    description: "رمز عبور حساب خود را تغییر دهید",
    href: "/dashboard/settings/change-password",
    icon: LockKeyhole,
  },
];

export default function SettingsPageClient() {
  return (
    <DashboardContainer>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Settings2 size={20} />
          </div>

          <Typography
            component="h1"
            className="text-xl! font-bold! text-slate-900 sm:text-2xl!"
          >
            تنظیمات
          </Typography>

          <Typography component="p" className="mt-1! text-sm! text-slate-500">
            مدیریت حساب کاربری و تنظیمات مجموعه
          </Typography>
        </div>

        {/* Account */}
        <section>
          <Typography
            component="h2"
            className="mb-3! text-sm! font-semibold! text-slate-700"
          >
            حساب کاربری
          </Typography>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {settingsItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} className="group">
                  <Card
                    elevation={0}
                    className="rounded-2xl! border border-slate-200! transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-slate-300! group-hover:shadow-sm!"
                  >
                    <div className="flex items-center gap-4 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Typography
                          component="h3"
                          className="text-sm! font-semibold! text-slate-900"
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          component="p"
                          className="mt-1! text-xs! leading-5! text-slate-500"
                        >
                          {item.description}
                        </Typography>
                      </div>

                      <ChevronLeft
                        size={18}
                        className="shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-slate-700"
                      />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Store */}
        <section>
          <Typography
            component="h2"
            className="mb-3! text-sm! font-semibold! text-slate-700"
          >
            مجموعه
          </Typography>

          <Card elevation={0} className="rounded-2xl! border border-slate-200!">
            <div className="p-5">
              <Typography
                component="h3"
                className="text-sm! font-semibold! text-slate-900"
              >
                تنظیمات مجموعه
              </Typography>

              <Typography
                component="p"
                className="mt-1! text-xs! leading-6! text-slate-500"
              >
                تنظیمات مربوط به مجموعه، اطلاعات کسب‌وکار و سایر گزینه‌های
                مدیریتی در این بخش قرار خواهند گرفت.
              </Typography>

              <div className="mt-4 inline-flex rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-400">
                به‌زودی
              </div>
            </div>
          </Card>
        </section>
      </div>
    </DashboardContainer>
  );
}
