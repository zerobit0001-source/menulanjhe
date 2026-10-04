"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

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

import { useGetReportsQuery } from "@/features/dashboard/api/reportsApi";
import { ReportsPeriod } from "@/features/dashboard/types/reports/reports.types";


export default function ReportsPage() {
  const reduce = useReducedMotion();

  const [period, setPeriod] = useState<ReportsPeriod>("today");

  const {
    data: report,
    isLoading,
    isError,
    refetch,
  } = useGetReportsQuery(period);

  console.log("ReportsPage report:", report);

  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 8 } as const),

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: {
      duration: 0.3,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <DashboardPageTransition>
      <DashboardContainer>
        <div className="space-y-6 pb-8">
          <DashboardReportsHeader period={period} onPeriodChange={setPeriod} />

          {isLoading && <DashboardReportsLoading />}

          {isError && <DashboardReportsError onRetry={refetch} />}

          {!isLoading && !isError && report?.ok && (
            <>
              <DashboardReportsSummary summary={report.summary} />

              {period === "week" && (
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
