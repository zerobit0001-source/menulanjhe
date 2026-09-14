import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-[#F8FAFC]">{children}</main>;
}
