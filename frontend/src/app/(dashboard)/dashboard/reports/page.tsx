"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ⚠️ Adjust these two imports to match where they live in your project.
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import DashboardPageTransition from "@/features/dashboard/components/DashboardPageTransition";

import DashboardReportsHeader from "@/features/dashboard/components/reports/DashboardReportsHeader";
import DashboardReportsSummary from "@/features/dashboard/components/reports/DashboardReportsSummary";
import DashboardReportsSalesChart from "@/features/dashboard/components/reports/DashboardReportsSalesChart";
import DashboardReportsStatus from "@/features/dashboard/components/reports/DashboardReportsStatus";
import DashboardReportsTopProducts from "@/features/dashboard/components/reports/DashboardReportsTopProducts";
import DashboardReportsTopCategories from "@/features/dashboard/components/reports/DashboardReportsTopCategories";
import {
  DashboardReportsError,
  DashboardReportsLoading,
} from "@/features/dashboard/components/reports/DashboardReportsState";

// Swap this import for the real API call later.
import {
  DashboardReport,
  ReportPeriod,
} from "@/features/dashboard/types/reports/reports.types";
import { getReport } from "@/features/dashboard/data/reports/demoReports";

export default function ReportsPage() {
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState<ReportPeriod>("today");
  const [report, setReport] = useState<DashboardReport | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading",
  );

  const load = useCallback(async (p: ReportPeriod) => {
    setStatus("loading");
    try {
      setReport(await getReport(p));
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load(period);
  }, [period, load]);

  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 8 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: reduce ? 0 : delay },
  });

  return (
    <DashboardPageTransition>
      <DashboardContainer>
        <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
          <DashboardReportsHeader period={period} onPeriodChange={setPeriod} />

          {status === "loading" && <DashboardReportsLoading />}
          {status === "error" && (
            <DashboardReportsError onRetry={() => load(period)} />
          )}

          {status === "ready" && report && (
            <>
              <DashboardReportsSummary summary={report.summary} />

              {period === "last_7_days" && (
                <motion.div {...fade(0.1)}>
                  <DashboardReportsSalesChart
                    data={report.sales_by_day ?? []}
                  />
                </motion.div>
              )}

              <motion.div {...fade(0.15)} className="grid gap-6 lg:grid-cols-2">
                <DashboardReportsStatus data={report.orders_by_status} />
                <DashboardReportsTopProducts products={report.top_products} />
              </motion.div>

              <motion.div {...fade(0.2)}>
                <DashboardReportsTopCategories
                  categories={report.top_categories}
                />
              </motion.div>
            </>
          )}
        </div>
      </DashboardContainer>
    </DashboardPageTransition>
  );
}
